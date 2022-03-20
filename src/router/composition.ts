import VueRouter from 'vue-router';
import { getCurrentInstance } from '@vue/composition-api';

export function useRouter(): VueRouter {
  const inst = getCurrentInstance();

  if (inst) {
    return inst.proxy.$router as VueRouter;
  }

  console.error('Ошибка инициализации роутера');
  return undefined as any;
}
