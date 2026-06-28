import { CATEGORIES } from '../config/constants.js';
import { roundCurrency } from '../utils/currency.js';

const emptyCategoryTotals = () => Object.fromEntries(CATEGORIES.map((category) => [category, 0]));

export const createSummary = (transactions) => {
  const summary = transactions.reduce((totals, transaction) => {
    if (transaction.amount >= 0) totals.income += transaction.amount;
    else totals.expense += Math.abs(transaction.amount);
    totals.categoryTotals[transaction.category] += Math.abs(transaction.amount);
    totals.expectedSavingsTotal += transaction.expectedSavings ?? 0;
    return totals;
  }, { income: 0, expense: 0, categoryTotals: emptyCategoryTotals(), expectedSavingsTotal: 0 });

  summary.income = roundCurrency(summary.income);
  summary.expense = roundCurrency(summary.expense);
  summary.expectedSavingsTotal = roundCurrency(summary.expectedSavingsTotal);
  summary.netBalance = roundCurrency(summary.income - summary.expense);
  summary.categoryTotals = Object.fromEntries(
    Object.entries(summary.categoryTotals).map(([key, value]) => [key, roundCurrency(value)]),
  );
  return summary;
};
