import { ref } from '@vue/composition-api';

const isAuthenticated = ref(false);

export const AUTH_KEY = 'token';

const login = async (data) => {
  const token = createToken(data);
  await loadData(token);
  window.localStorage.setItem(AUTH_KEY, token);
};

const logout = async () => {
  window.localStorage.removeItem(AUTH_KEY);
};

const checkAccess = async () => {
  const token = window.localStorage.getItem(AUTH_KEY);

  if (!token) {
    throw false;
  }

  await loadData(token);
};

export const loadData = async (token: string) => {
  // const userStore = useUserStore();
  // const shopStore = useShopStore();

  // await Promise.all([userStore.getUser(token), shopStore.getShop(token)]);

  isAuthenticated.value = true;
};

const createToken = (data) => {
  return (
    'Basic ' +
    `${btoa(unescape(encodeURIComponent(`${data.username}:${data.password}`)))}`
  );
};

export { login, logout, checkAccess, isAuthenticated };
