/**
 * Formatea un número de teléfono de Paraguay mientras se ingresa.
 * @param input El valor actual del campo de entrada.
 * @returns El número de teléfono formateado según el patrón 0XXXXXXXXX.
 */
export function formatPhoneNumber(input: string): string {
  // Eliminar todos los caracteres no numéricos
  const cleaned = input.replace(/\D/g, '');
  
  // Si comienza con 595, reemplazar por 0
  const normalized = cleaned.startsWith('595') ? '0' + cleaned.slice(3) : cleaned;
  
  // Asegurarse de que comience con 0 si tiene más de 1 dígito
  const withZero = normalized.length > 1 && !normalized.startsWith('0') ? '0' + normalized : normalized;
  
  // Limitar a 10 dígitos y devolver sin espacios
  return withZero.slice(0, 10);
}
