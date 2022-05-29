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
          <span style="margin-left: 10px;">СОЗДАНИЕ УСЛУГИ</span>
        </h4>
      </div>

      <div :class="$style.row">
        <v-text-field
          v-model="service.title"
          :error="$val.title.$invalid"
          small
          outlined
          label="Название"
          hide-details
        ></v-text-field>
      </div>

      <div :class="$style.row">
        <v-text-field
          v-model="service.description"
          :class="$style.input"
          :error="$val.description.$invalid"
          small
          outlined
          label="Описание"
          hide-details
        ></v-text-field>
      </div>
      <div :class="$style.row">
        <v-text-field
          v-model.number="service.cost"
          :class="$style.input"
          :error="$val.cost.$invalid"
          small
          outlined
          type="money"
          label="Цена"
          hide-details
        ></v-text-field>
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
import { defineComponent, ref } from '@vue/composition-api';
import { useRouter } from '@/router/composition';
import useBreadcrumbs from '../../core/composition/useBreadcrumbs';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import useServices from '@/features/services/composition/useServices';

export default defineComponent({

  setup() {
    const router = useRouter();

    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'НОВАЯ УСЛУГА']);

    const {
      createService
    } = useServices();

    const service = ref<any>({
      title: null,
      description: null,
      cost: null,
      services: null,
    });

    // VALIDATION
    let $val = useVuelidate(
      {
        title: { required },
        description: { required },
        cost: { required },
      },
      service,
      { $lazy: true }
    );

    const onCreate = async () => {
      const isValid = await $val.value.$validate();

      if (isValid) {
        await createService(service.value);
        router.back();
      }
    };

    return {
      breadcrumbs,
      router,

      $val,
      service,
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