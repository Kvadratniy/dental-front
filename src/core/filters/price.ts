/**
 * Форматирование цены
 * 77848.26666 => 77 848,27
 *
 * @param value {number}
 * @param [currency=RUB] {string}
 * @return {string}
 */
export const formatPrice = (value: number, currency = 'RUB'): string => {
  if (!Number.isFinite(value)) {
    return '';
  }

  const d = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  });

  return d.format(value);
};

export const formatPriceWithoutKopek = (
  value: number,
  currency = 'RUB'
): string => {
  if (!Number.isFinite(value)) {
    return '';
  }

  const d = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  });

  return d.format(value);
};

export const formatPriceWithoutCurrency = (value: number): string => {
  if (!Number.isFinite(value)) {
    return '';
  }

  const d = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
  });

  return d.format(value);
};

export default { formatPrice, formatPriceWithoutCurrency };
