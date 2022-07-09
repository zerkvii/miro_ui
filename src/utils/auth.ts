// @ts-ignore
import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  Cookies.set(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  Cookies.remove(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
