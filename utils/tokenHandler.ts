import { setItem, getItem, removeItem, hasItem } from './storageHandler';

const TOKEN_KEY = 'auth_token';

export const setToken = (token: string): void => {
  setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return hasItem(TOKEN_KEY);
};
