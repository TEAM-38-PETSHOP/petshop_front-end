export const numberToCurrency = (num: number) => {
  return num.toLocaleString('uk-UA', {
    style: 'currency',
    currency: 'UAH',
  });
};
