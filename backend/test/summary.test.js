import test from 'node:test';
import assert from 'node:assert/strict';
import { createSummary } from '../src/reducers/summaryReducer.js';

test('creates complete financial metrics', () => {
  const summary = createSummary([
    { amount: 1000, category: 'Salary', expectedSavings: null },
    { amount: -200, category: 'Food & Dining', expectedSavings: 10 },
    { amount: -100, category: 'Travel', expectedSavings: null },
  ]);
  assert.deepEqual(summary, {
    income: 1000,
    expense: 300,
    netBalance: 700,
    expectedSavingsTotal: 10,
    categoryTotals: { 'Food & Dining': 200, Travel: 100, Salary: 1000, Miscellaneous: 0 },
  });
});
