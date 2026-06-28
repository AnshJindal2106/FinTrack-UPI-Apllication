export const roundCurrency = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
