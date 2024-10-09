import { getSession } from 'next-auth/react';
import { setItem, getItem, removeItem, hasItem } from './storageHandler';

const TOKEN_KEY = 'auth_token';

export const setToken = (token: string): void => {
  setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  const session : any = await getSession();
  return session.user.access_token;
};

export const removeToken = (): void => {
  removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return hasItem(TOKEN_KEY);
};
