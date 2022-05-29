import container from '../../di';
import {
  DiscountsApi,
  DISCOUNTS_API_SERVICE_ID,
} from '../../core/api/discounts';
import { ref } from '@vue/composition-api';

export default function useDiscounts() {
  const api = container.get<DiscountsApi>(DISCOUNTS_API_SERVICE_ID);
  const items = ref<any>([]);
  const item = ref<any>(null);

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
    { text: '', value: 'delete'}
  ];

  const createDiscount = async (data) => {
    await api.createDiscount(data);
  };

  const loadDiscounts = async () => {
    items.value = await api.getAllDiscounts();
  }

  const loadDiscountsById = async (id) => {
    item.value = await api.getDiscountById(id);
  }

  const subscribeUserById = async (id) => {
    await api.subscribeUserById(item.value.id, [id]);
  };

  return {
    api,
    headers,
    items,
    item,
    createDiscount,
    loadDiscounts,
    loadDiscountsById,
    subscribeUserById,
  }
};