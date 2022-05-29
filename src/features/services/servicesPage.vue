<template>
  <page-container :breadcrumbs="breadcrumbs">
    <template #header>
      <h4 :class="$style.title">
        <v-icon
          color="#DF9F46"
        >
          mdi-database
        </v-icon>
        <span style="margin-left: 10px;">Список услуг</span>
      </h4>
      <v-btn
        dark
        depressed
        color="#DF9F46"
        @click="router.push({ name: 'create-service' })"
      >
        Создать
      </v-btn>
    </template>
    <template #content>
      <v-data-table
        fixed-header
        :headers="headers"
        :items="services"
        :items-per-page="15"
      >
      <template #item.cost="{ value }">
        {{ formatPrice(value) }}
      </template>
      </v-data-table>
    </template>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import pageContainer from '@/core/components/page-container.vue';
import { useRouter } from '@/router/composition';
import useBreadcrumbs from '../../core/composition/useBreadcrumbs';
import useServices from './composition/useServices';
import { formatPrice } from '@/core/filters/price';

export default defineComponent({
  components: { pageContainer },

  setup() {
    const router = useRouter();

    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'УСЛУГИ']);

    const {
      headers,
      services,
      loadServices
    } = useServices();

    // const onClickRow = (item) => {
    //   router.push({
    //     name: 'user-subs',
    //     params: {
    //       id: item.id,
    //     },
    //   });
    // }

    onMounted(async () => {
      await loadServices();
    });

    return {
      breadcrumbs,
      headers,
      services,
      router,
      formatPrice
    }
  }
});
</script>

<style module>
.title {
  font-family: 'Montserrat';
  font-size: 14px;
  color: var(--color-dark);
  font-weight: 900;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}
</style>