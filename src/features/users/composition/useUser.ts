import { computed, ref } from "@vue/composition-api";
import container from '@/di';
import {
  UsersApi,
  USERS_API_SERVICE_ID,
} from '@/core/api/users';

export default function useUser() {
  const api = container.get<UsersApi>(USERS_API_SERVICE_ID);
  const discounts = ref([]);
  const users = ref<any>([]);
  const headers = [
    {
      text: '№',
      align: 'start',
      sortable: false,
      value: 'id',
    },
    { text: 'Имя', value: 'firstName' },
    { text: 'Роль', value: 'role' },
    { text: 'Почта', value: 'email' },
    { text: 'Баланс', value: 'balance' },
  ];

  const softHeaders = [
    {
      text: '№',
      align: 'start',
      sortable: false,
      value: 'id',
    },
    { text: 'Имя', value: 'firstName' },
    { text: 'Почта', value: 'email' },
  ];

  const managers = computed(() => users.value.filter(u => u.role === 'manager'));

  const loadUsers = async () => {
    const resp = await api.getAllUsers();
    users.value = resp.map((item) => ({
      ...item,
      balance: item.purse.balance,
      short: `${item.firstName} ${item.lastName}`
    }));
  };

  const loadUserDiscounts = async () => {
    discounts.value = await api.getCurrentUserDiscounts();
    
  }

  return {
    headers,
    softHeaders,
    users,
    managers,
    discounts,
    loadUsers,
    loadUserDiscounts,
  }
}