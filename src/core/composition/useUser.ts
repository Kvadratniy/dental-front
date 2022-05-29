import container from '../../di';
import {
  UsersApi,
  USERS_API_SERVICE_ID,
} from '@/core/api/users';
import { onMounted, ref } from '@vue/composition-api';

export default function useUser() {
  const userApi = container.get<UsersApi>(USERS_API_SERVICE_ID);

  const user = ref<any>(null);
  const discounts = ref<any>([]);

  onMounted(async () => {
    user.value = await userApi.getCurrentUser();
  })

  // const updateUser = async (id) => {
  //   user.value = await userApi.getUserById(id);
  //   discounts.value = await userApi.getUserDiscounts(id);
  // };

  return {
    user,
    // discounts,
    // updateUser
  };
};