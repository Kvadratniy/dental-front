import { ref } from '@vue/composition-api';
import container from '@/di';
import {
  AuthApi,
  AUTH_API_SERVICE_ID,
} from '@/core/api/auth';

const isAuthenticated = ref(false);
const user = ref<any>(null);

export const AUTH_KEY = 'token';

const checkAccess = async () => {
  const api = container.get<AuthApi>(AUTH_API_SERVICE_ID);
  const token = window.localStorage.getItem(AUTH_KEY);
  if (!token) {
    return false;
  }

  try {
    user.value = await api.getCurrentUser();
    console.log(user.value);
    isAuthenticated.value = true;
    return true;
  } catch (err) {
    isAuthenticated.value = false;
    return false;
  }
};

const pagesForRoles = {
  manager: ['account'],
  administrator: ['account', 'sales', 'sale'],
  director: ['users', 'create-user', 'sales', 'sale', 'create-discount', 'discounts', 'account', 'user-subs', 'services', 'create-service']
}

const hasPermissionsNeeded = (to) => {
  return pagesForRoles[user.value.role].includes(to.name)
};

export { checkAccess, isAuthenticated, user, hasPermissionsNeeded };
