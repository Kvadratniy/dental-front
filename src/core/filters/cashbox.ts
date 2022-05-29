export const formatCashbox = (cashbox: any): string | void => {
  if (cashbox) {
    return cashbox.cashNumber;
  }
};

export default { formatCashbox };
