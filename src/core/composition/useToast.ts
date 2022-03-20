import { provide, inject } from '@vue/composition-api';
import { createToastInterface } from 'vue-toastification';

const toastSymbol = Symbol('Vue Toastification');

export const provideToast = (options) =>
  provide(toastSymbol, createToastInterface(options));

export const useToast = (): ReturnType<typeof createToastInterface> =>
  // @ts-ignore
  inject(toastSymbol);
