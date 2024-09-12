// Manejador de almacenamiento local

// Función para guardar un elemento en el almacenamiento local
export const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

// Función para obtener un elemento del almacenamiento local
export const getItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

// Función para eliminar un elemento del almacenamiento local
export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

// Función para limpiar todo el almacenamiento local
export const clearStorage = (): void => {
  localStorage.clear();
};

// Función para verificar si existe un elemento en el almacenamiento local
export const hasItem = (key: string): boolean => {
  return localStorage.getItem(key) !== null;
};
