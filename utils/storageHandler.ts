const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const safeLocalStorageOperation = (operation: () => void): void => {
  if (isLocalStorageAvailable()) {
    operation();
  } else {
    console.warn('localStorage no está disponible');
  }
};


export const setItem = (key: string, value: string): void => {
  safeLocalStorageOperation(() => localStorage.setItem(key, value));
};

export const getItem = (key: string): string | null => {
  if (isLocalStorageAvailable()) {
    return localStorage.getItem(key);
  }
  console.warn('localStorage no está disponible');
  return null;
};

export const removeItem = (key: string): void => {
  safeLocalStorageOperation(() => localStorage.removeItem(key));
};

export const clearStorage = (): void => {
  safeLocalStorageOperation(() => localStorage.clear());
};

export const hasItem = (key: string): boolean => {
  if (isLocalStorageAvailable()) {
    return localStorage.getItem(key) !== null;
  }
  console.warn('localStorage no está disponible');
  return false;
};
