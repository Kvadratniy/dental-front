<template>
  <div>
    <v-simple-table light>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Иня
            </th>
            <th class="text-left">
              Почта
            </th>
            <th class="text-left">
              Баланс
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
          >
            <td>{{ item.firstName }} {{item.lastName}}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.purse.balance }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import container from '../../di';
import {
  UsersApi,
  USERS_API_SERVICE_ID,
} from '../../core/api/users';
import { defineComponent, onMounted, ref } from '@vue/composition-api';

export default defineComponent({

  setup() {
    const items = ref<any>([]);
    const api = container.get<UsersApi>(USERS_API_SERVICE_ID);

    onMounted(async () => {
      items.value = await api.getAllUsers();
    });

    return {
      items
    }
  }
});
</script>

<style>

</style>