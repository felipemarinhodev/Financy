/**
 * Formata uma data no formato curto brasileiro (dd/mm/aaaa).
 *
 * @param date - Objeto Date representando a data a ser formatada
 * @returns String com a data formatada no padrão brasileiro curto
 *
 * @example
 * ```typescript
 * dateFormatter(new Date("2024-03-15"))
 * // Retorna: "15/03/2024"
 * ```
 */
export const dateFormatter = (date: Date): string => {
  return new Date(date).toLocaleDateString("pt-BR");
};

/**
 * Formata uma data no formato longo brasileiro com o nome completo do mês.
 *
 * @param dateString - String representando uma data no formato ISO 8601 ou qualquer formato válido para o construtor Date
 * @returns String com a data formatada incluindo dia, mês por extenso e ano
 *
 * @example
 * ```typescript
 * dateFormatterLong("2024-03-15")
 * // Retorna: "15 de março de 2024"
 * ```
 */
export const dateFormatterLong = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/**
 * Formata uma data exibindo apenas o mês por extenso e o ano.
 *
 * @param dateString - String representando uma data no formato ISO 8601 ou qualquer formato válido para o construtor Date
 * @returns String com o mês por extenso e o ano
 *
 * @example
 * ```typescript
 * dateFormatterMonthYear("2024-03-15")
 * // Retorna: "março de 2024"
 * ```
 */
export const dateFormatterMonthYear = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
};

/**
 * Formata uma data exibindo apenas o ano.
 *
 * @param dateString - String representando uma data no formato ISO 8601 ou qualquer formato válido para o construtor Date
 * @returns String contendo apenas o ano com 4 dígitos
 *
 * @example
 * ```typescript
 * dateFormatterYear("2024-03-15")
 * // Retorna: "2024"
 * ```
 */
export const dateFormatterYear = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
  });
};

export const dateFormatterMonth = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    month: "long",
  });
};
