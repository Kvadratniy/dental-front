import container from '@/di';
import {
  SalesApi,
  SALES_API_SERVICE_ID,
} from '@/core/api/sales';
import { ref } from '@vue/composition-api';

export default function useSales() {
  const api = container.get<SalesApi>(SALES_API_SERVICE_ID);
  const items = ref<any>([]);
  const headers = [
    {
      text: '№',
      align: 'start',
      sortable: false,
      value: 'id',
    },

    { text: 'Дата создания', value: 'creationDate' },
    { text: 'Статус', value: 'status'},
    { text: 'Услуги', value: 'servicesIds' },
    { text: 'Менеджер', value: 'responsibleManager' },
    { text: 'Скидка', value: 'discount' },
    { text: 'Сумма', value: 'total' },
  ];

  const uploadSales = async() => {
    const data = await api.getSales();
    items.value = data.reverse();
  }

  const create = async (user: string, disc: string) => {
    const data = {
      responsibleManager : {
          id: user.split('=')[1]
      },
      discount: {
          id: disc.split('=')[1]
      }
    };
    await api.createSale(data);
    await uploadSales();
  };

  const complete = async (id, total, servicesIds) => {
    await api.completeSale({
      id,
      total,
      servicesIds,
    });
  }

  return {
    headers,
    items,
    create,
    complete,
    uploadSales
  }
}