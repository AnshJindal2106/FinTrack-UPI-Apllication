import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateExpectedSavings, categorizeMessage, extractAmount, parseRawMessage, parseTransaction } from '../src/parser/transactionParser.js';

test('categorizes known merchant and employer keywords', () => {
  assert.equal(categorizeMessage('Paid Rs.250 to ZOMATO'), 'Food & Dining');
  assert.equal(categorizeMessage('Paid Rs.430 to Rapido'), 'Travel');
  assert.equal(categorizeMessage('Salary from ABC Pvt Ltd'), 'Salary');
  assert.equal(categorizeMessage('Paid electricity bill'), 'Miscellaneous');
});

test('adds 5% savings only to eligible outgoing transactions', () => {
  assert.equal(calculateExpectedSavings('Paid Rs.900 Cashback', -900), 45);
  assert.equal(calculateExpectedSavings('Received Rs.900 Cashback', 900), null);
  assert.equal(calculateExpectedSavings('Paid Rs.900 normally', -900), null);
});

test('derives all computed transaction fields', () => {
  const item = parseTransaction({ id: '1', rawMessage: 'Paid Rs.760 to Pizza Hut Rewards', amount: -760, date: '2026-01-01' });
  assert.equal(item.type, 'expense');
  assert.equal(item.category, 'Food & Dining');
  assert.equal(item.expectedSavings, 38);
});

test('creates a complete transaction from a user sentence', () => {
  assert.equal(extractAmount('Paid Rs.1,250 to Amazon'), -1250);
  assert.equal(extractAmount('Received ₹25,000 from ABC Pvt Ltd'), 25000);
  const item = parseRawMessage('Paid Rs.900 to Swiggy Cashback');
  assert.equal(item.amount, -900);
  assert.equal(item.category, 'Food & Dining');
  assert.equal(item.expectedSavings, 45);
  assert.equal(item.displayName, 'Swiggy Cashback');
});
