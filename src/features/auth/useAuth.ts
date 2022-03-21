import { reactive, ref } from '@vue/composition-api';
import { useToast } from '@/core/composition/useToast';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

import { login } from '@/core/auth';
import { useRouter } from '@/router/composition';
import { getHTTPError } from '@/core/utils/errors';

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

    // const token = await api.login({
    //   "email": "super@user.ru",
    //   "password": "super"
    // });

  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
  };










  // const v$ = useVuelidate(rules, state);

  return {
    login,
    logout
  };
}
