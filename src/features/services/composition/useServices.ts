import { computed, ref } from "@vue/composition-api";
import container from '@/di';
import {
  ServicesApi,
  SERVICES_API_SERVICE_ID,
} from '@/core/api/services';

export default function useUser() {
  const api = container.get<ServicesApi>(SERVICES_API_SERVICE_ID);

  const services = ref<any>([]);
  const headers = [
    {
      text: '№',
      align: 'start',
      sortable: false,
      value: 'id',
    },
    { text: 'Название', value: 'title' },
    { text: 'Описания', value: 'description' },
    { text: 'Цена', value: 'cost' },
  ];

  const loadServices = async () => {
    services.value = await api.getServices();
    return services.value;
  };

  const createService = async (service: any) => {
    await api.createService(service);
    await loadServices();
  }

  return {
    headers,
    services,
    loadServices,
    createService,
  }
}