<template>
  <div>
    <div style="margin: 10px 20px;adding: 16px;">
      <v-breadcrumbs
        :items="breadcrumbs"
        large
      ></v-breadcrumbs>
    </div>

    <div :class="$style.container">

      <h4 :class="$style.title">
        <v-icon
          color="#DF9F46"
        >
          mdi-wallet-giftcard
        </v-icon>
        <span style="margin-left: 10px;">Список активных скидок</span>
      </h4>
      <!-- <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Дата"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :landscape="false"
          @input="menu = false"
        ></v-date-picker>
      </v-menu> -->
      <template>
        <v-data-table
          fixed-header
          :headers="headers"
          :items="items"
          :items-per-page="15"
        ></v-data-table>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import container from '../../di';
import {
  DiscountsApi,
  DISCOUNTS_API_SERVICE_ID,
} from '../../core/api/discounts';
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { useRouter } from '@/router/composition';


export default defineComponent({

  setup() {
    const router = useRouter();
    const items = ref<any>([]);
    const date = ref(null);
    const menu = ref(false)
    const api = container.get<DiscountsApi>(DISCOUNTS_API_SERVICE_ID);
    const breadcrumbs = [
      {
        text: 'DENTAL CLUB',
        disabled: true,
        href: '',
      },
      {
        text: 'СКИДКИ',
        disabled: true,
        href: 'discounts',
      },
    ]
    const headers = [
      {
        text: '№',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Дата создания', value: 'creationDate' },
      { text: 'Дата окончания действия', value: 'endDate' },
      { text: 'Скидка', value: 'sale' },
    ];

    onMounted(async () => {
      items.value = await api.getAllDiscounts();
    });

    return {
      date,
      menu,
      headers,
      items,
      router,
      breadcrumbs,
    }
  }
});
</script>

<style module lang="scss">
.container {
  margin: 0 20px 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: -10px -20px 27px rgb(0 0 0 / 5%);
}

.title {
  padding: 0 0 16px 0;
  font-family: 'Montserrat';
  font-size: 14px;
  color: var(--color-dark);
  border-bottom: 2px solid #DF9F46;
  font-weight: 900;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

.header {
  font-family: 'Montserrat';
  color: var(--color-dark) !important;
}

</style>