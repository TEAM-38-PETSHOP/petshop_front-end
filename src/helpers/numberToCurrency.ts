export const numberToCurrency = (num: number) => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' грн';
};
