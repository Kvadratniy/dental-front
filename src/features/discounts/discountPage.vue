<template>
  <page-container :breadcrumbs="breadcrumbs">
    <template #header>
      <h4 :class="$style.title">
        <v-icon
          color="#DF9F46"
        >
          mdi-wallet-giftcard
        </v-icon>
        <span style="margin-left: 10px;">Список скидок</span>
      </h4>
      <v-btn
        dark
        depressed
        color="#DF9F46"
        @click="router.push({ name: 'create-discount' })"
      >
        Новая скидка
      </v-btn>
    </template>

    <template #content>
      <v-data-table
        fixed-header
        :headers="headers"
        :items="items"
        :items-per-page="15"
        @click:row="onClickRow"
      >
        <template #item.creationDate="{ value }">
          {{ formatDate(value) }}
        </template>

        <template #item.endDate="{ value }">
          {{ formatDate(value) }}
        </template>

        <template #item.sale="{ value }">
          {{ value }} %
        </template>
        <template #item.delete>
        <!-- <v-btn
          dark
          depressed
          color="#df4646"
          small
          block
        >
          Удалить
        </v-btn> -->
        </template>
      </v-data-table>
    </template>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import pageContainer from '@/core/components/page-container.vue';
import { useRouter } from '@/router/composition';
import { formatDate } from '@/core/filters/date';
import useBreadcrumbs from '../../core/composition/useBreadcrumbs';
import useDiscounts from '../../core/composition/useDiscounts';

export default defineComponent({
  components: { pageContainer },

  setup() {
    const router = useRouter();
    const date = ref(null);
    const menu = ref(false)
    const img = ref<any>(null);

    const {
      breadcrumbs,
    } = useBreadcrumbs(['DENTAL CLUB', 'СКИДКИ']);

    const {
      headers,
      items,
      loadDiscounts,
    } = useDiscounts();

    const onClickRow = (item) => {
      router.push({
        name: 'user-subs',
        params: {
          id: item.id,
        },
      });
    }

    onMounted(async () => {
      await loadDiscounts();
    });
    

    return {
      img,
      date,
      menu,
      headers,
      items,
      router,
      breadcrumbs,
      formatDate,
      onClickRow,
    }
  }
});
</script>

<style module lang="scss">
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