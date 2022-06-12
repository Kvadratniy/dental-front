import { computed, ref } from "@vue/composition-api";
import container from '@/di';
import {
  PurseApi,
  PURSE_API_SERVICE_ID,
} from '@/core/api/purse';

export default function useUser() {
  const api = container.get<PurseApi>(PURSE_API_SERVICE_ID);
  const items = ref<any>([]);
  const writeoffQr = ref(null);
  const headers = [
    {
      text: '№',
      align: 'start',
      sortable: false,
      value: 'id',
    },
    { text: 'Дата', value: 'date' },
    { text: 'Сумма', value: 'amount' },
    { text: 'Пользователь', value: 'user' },
  ];

  const loadItems = async () => {
    items.value = await api.getItems();
  };

  const loadWriteoffQr = async () => {
    writeoffQr.value = await api.getWriteoffQR();
  };

  const writeoffSum = async (user, amount) => {
    await api.writeoffSum({
      user,
      amount,
    });
  }

  return {
    writeoffQr,
    headers,
    items,
    loadItems,
    writeoffSum,
    loadWriteoffQr
  }
}