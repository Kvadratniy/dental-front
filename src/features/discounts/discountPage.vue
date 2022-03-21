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
              Дата окончания действия
            </th>
            <th class="text-left">
              Скидка
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
            <td>{{ item.endDate }}</td>
            <td>{{ item.sale }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
    const api = container.get<DiscountsApi>(DISCOUNTS_API_SERVICE_ID);

    onMounted(async () => {
      items.value = await api.getAllDiscounts();
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
  -webkit-box-shadow: 0px 0px 17px 3px rgba(34, 60, 80, 0.19);
  -moz-box-shadow: 0px 0px 17px 3px rgba(34, 60, 80, 0.19);
  box-shadow: 0px 0px 17px 3px rgba(34, 60, 80, 0.19);
}
</style>