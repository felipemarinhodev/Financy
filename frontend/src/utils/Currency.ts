export const formatCurrency = (
  amount: number = 0,
  locale = "pt-BR",
  currency = "BRL"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
