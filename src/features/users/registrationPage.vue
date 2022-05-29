<template>
  <div :class="$style.wrapper">
    <div style="margin: 10px 20px;adding: 16px;">
      <v-breadcrumbs
        :items="breadcrumbs"
        large
      ></v-breadcrumbs>
    </div>

    <div :class="$style.container">
      <div :class="$style.headerContainer">
        <h4 :class="$style.title">
          <v-icon
            color="#DF9F46"
          >
            mdi-account-box
          </v-icon>
          <span style="margin-left: 10px;">РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ</span>
        </h4>
      </div>

      <div :class="$style.row">
        <v-text-field
          v-model="user.firstName"
          :error="$val.firstName.$invalid"
          small
          outlined
          label="Имя"
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="user.lastName"
          :error="$val.lastName.$invalid"
          small
          outlined
          label="Фамилия"
          hide-details
        ></v-text-field>
      </div>

      <div :class="$style.row">
        <v-text-field
          v-model="user.email"
          :class="$style.input"
          :error="$val.email.$invalid"
          small
          outlined
          label="E-mail"
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          :class="$style.input"
          :error="$val.password.$invalid"
          small
          outlined
          label="Пароль"
          hide-details
        ></v-text-field>
      </div>

      <div :class="$style.row">
        <v-text-field
          v-model.number="user.benefits"
          :class="$style.input"
          :error="$val.benefits.$invalid"
          type="number"
          small
          outlined
          label="Процент вознаграждения, %"
          hide-details
        ></v-text-field>
      </div>


      <div :class="$style.row">
        <h4 :class="$style.title"> Дополнительная информация</h4>
      </div>

      <div :class="$style.row">
        <v-select
          v-model="user.role"
          :error="$val.role.$invalid"
          :items="roles"
          small
          item-value="id"
          item-text="title"
          label="Должность"
        ></v-select>
      </div>

      <div :class="$style.row">
        <v-btn
          dark
          depressed
          color="#DF9F46"
          @click="onCreate"
        >
          Зарегистрировать
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { useRouter } from '@/router/composition';
import useAuth from '../auth/useAuth';
import useBreadcrumbs from '../../core/composition/useBreadcrumbs';
import { useVuelidate } from '@vuelidate/core';
import { required, email, between } from '@vuelidate/validators';

export default defineComponent({

  setup() {
    const router = useRouter();
    const { registration } = useAuth();

    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'НОВЫЙ ПОЛЬЗОВАТЕЛЬ']);

    const user = ref<any>({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      benefits: null,
      role: null,
    });

    // VALIDATION
    let $val = useVuelidate(
      {
        firstName: { required },
        lastName: { required },
        email: { email, required },
        password: { required },
        role: { required },
        benefits: { required, between: between(0, 100) },
      },
      user,
      { $lazy: true }
    );

    // ROLES
    const roles = [{
      id: 'manager',
      title: 'Менеджер'
    },{
      id: 'administrator',
      title: 'Администратор'
    }];

    const onCreate = async () => {
      const isValid = await $val.value.$validate();

      if (isValid) {
        await registration(user.value);
        router.back();
      }
    };

    return {
      roles,
      breadcrumbs,
      router,

      $val,
      user,
      onCreate
    }
  }
});
</script>

<style module lang="scss">
.wrapper {
  height: 100%;
}

.container {
  margin: 0 20px 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: -10px -20px 27px rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: column;
  flex: 1 0;
}

.title {
  font-family: 'Montserrat';
  font-size: 14px;
  color: var(--color-dark);
  font-weight: 900;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

.headerContainer {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #DF9F46;
  padding: 0 0 16px 0;
  gap: 16px
}

.header {
  font-family: 'Montserrat';
  color: var(--color-dark) !important;
}

.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  padding: 15px 0 0;
  max-width: 700px;
}

@media (max-width: 768px) {
  .input {
    width: 100%;
  }
}
</style>