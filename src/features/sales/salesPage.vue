<template>
  <div :class="$style.container">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              №
            </th>
            <th class="text-left">
              Дата создания
            </th>
            <th class="text-left">
              Менеджер
            </th>
            <th class="text-left">
              Скидка
            </th>
            <th class="text-left">
              Сумма
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.creationDate }}</td>
            <td>{{ item.responsibleManager.firstName }} {{ item.responsibleManager.lastName}}</td>
            <td>{{ item.discount.sale }}</td>
            <td>{{ item.total }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import container from '@/di';
import {
  SalesApi,
  SALES_API_SERVICE_ID,
} from '@/core/api/sales';
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { useRouter } from '@/router/composition';

export default defineComponent({
  setup() {
    const router = useRouter();
    const items = ref<any>([]);
    const api = container.get<SalesApi>(SALES_API_SERVICE_ID);

    onMounted(async () => {
      items.value = await api.getSales();
    });

    return {
      items,
      router
    }
  }
});
</script>

<style module>
.container {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 20px 27px rgb(0 0 0 / 5%);
}
</style>