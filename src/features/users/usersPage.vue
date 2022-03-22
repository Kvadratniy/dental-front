<template>
  <div :class="$style.container">
    <v-simple-table>
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
            @click="router.push({ name: 'user-profile', params: { id: item.id }})"
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
import { useRouter } from '@/router/composition';


export default defineComponent({

  setup() {
    const router = useRouter();
    const items = ref<any>([]);
    const api = container.get<UsersApi>(USERS_API_SERVICE_ID);

    onMounted(async () => {
      items.value = await api.getAllUsers();
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