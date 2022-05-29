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
          <span style="margin-left: 10px;">СОЗДАНИЕ СКИДКИ</span>
        </h4>
      </div>


      <div :class="$style.row">
        <v-text-field
          v-model="discount.sale"
          :error="$val.sale.$invalid"
          small
          outlined
          label="Скидка %"
          type="number"
          hide-details
        ></v-text-field>
      </div>

      <div :class="$style.row">
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="discount.endDate"
              :error="$val.endDate.$invalid"
              label="Дата окончания действия скидки"
              append-icon="mdi-calendar"
              readonly
              outlined
              hide-details
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="discount.endDate"
            locale="ru-ru"
            color="#DF9F46"
            no-title
            scrollable
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </div>
      <div :class="$style.row">
        <v-btn
          dark
          depressed
          color="#DF9F46"
          @click="onCreate"
        >
          Создать
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import container from '../../di';
import {
  UsersApi,
  USERS_API_SERVICE_ID,
} from '../../core/api/users';
import { defineComponent, ref } from '@vue/composition-api';
import { useRouter } from '@/router/composition';
import useBreadcrumbs from '../../core/composition/useBreadcrumbs';
import useVuelidate from '@vuelidate/core';
import useDiscounts from '../../core/composition/useDiscounts';
import { required } from '@vuelidate/validators';

export default defineComponent({

  setup() {
    const router = useRouter();
    const dateMenu = ref(false);
    const api = container.get<UsersApi>(USERS_API_SERVICE_ID);

    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'НОВАЯ СКИДКА']);

    const {
      createDiscount,
    } = useDiscounts();

    const discount = ref<any>({
      sale: null,
      endDate: null,
    });

    // VALIDATION
    let $val = useVuelidate(
      {
        sale: { required },
        endDate: { required },
      },
      discount,
      { $lazy: true }
    );

    const onCreate = async () => {
      const isValid = await $val.value.$validate();

      if (isValid) {
        createDiscount(discount.value);
        router.back();
      }
    };

    return {
      onCreate,
      dateMenu,
      breadcrumbs,
      $val,
      discount,
      router
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
  gap: 24px;
  padding: 15px 0 0;
  max-width: 700px;
}
</style>