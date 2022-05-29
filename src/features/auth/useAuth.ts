import { useRouter } from '@/router/composition';

import container from '../../di';
import {
  AuthApi,
  AUTH_API_SERVICE_ID,
} from '../../core/api/auth';

const AUTH_KEY = 'token';

export default function useAuth() {
  const api = container.get<AuthApi>(AUTH_API_SERVICE_ID);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      const token = await api.login({
        email,
        password
      });
      window.localStorage.setItem(AUTH_KEY, token.token);
      router.push('/');
    } catch (e) {
      console.log(e)
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    router.push('/auth');
  };

  const registration = async (data) => {
    await api.registration(data);
  };

  const getCurrentUser = () => {
    return api.getCurrentUser();
  }

  return {
    AUTH_KEY,
    login,
    registration,
    logout,
    getCurrentUser,
  };
}
