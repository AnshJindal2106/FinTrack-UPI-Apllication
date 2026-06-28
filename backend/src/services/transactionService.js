import { CATEGORIES } from '../config/constants.js';
import { seedTransactions } from '../data/seedTransactions.js';
import { parseRawMessage, parseTransaction } from '../parser/transactionParser.js';
import { createSummary } from '../reducers/summaryReducer.js';

let transactions = seedTransactions.map(parseTransaction);

const compare = (left, right, direction) => {
  const result = left < right ? -1 : left > right ? 1 : 0;
  return direction === 'asc' ? result : -result;
};

export const getAllTransactions = () => [...transactions];

export const queryTransactions = ({ search = '', category = 'all', type = 'all', sortBy = 'date', order = 'desc' }) => {
  const term = search.trim().toLowerCase();
  const safeSort = ['date', 'amount'].includes(sortBy) ? sortBy : 'date';
  const safeOrder = order === 'asc' ? 'asc' : 'desc';

  return transactions
    .filter((item) => !term || item.rawMessage.toLowerCase().includes(term))
    .filter((item) => category === 'all' || item.category === category)
    .filter((item) => type === 'all' || item.type === type)
    .sort((left, right) => {
      const leftValue = safeSort === 'date' ? new Date(left.date).getTime() : Math.abs(left.amount);
      const rightValue = safeSort === 'date' ? new Date(right.date).getTime() : Math.abs(right.amount);
      return compare(leftValue, rightValue, safeOrder);
    });
};

export const getSummary = () => createSummary(transactions);

export const addTransaction = (rawMessage) => {
  const transaction = parseRawMessage(rawMessage);
  transactions = [transaction, ...transactions];
  return transaction;
};

export const updateTransactionCategory = (id, category) => {
  if (!CATEGORIES.includes(category)) {
    const error = new Error('Please choose a valid category.');
    error.status = 400;
    throw error;
  }
  const index = transactions.findIndex((item) => item.id === id);
  if (index === -1) {
    const error = new Error('Transaction not found.');
    error.status = 404;
    throw error;
  }
  transactions = transactions.map((item, itemIndex) => itemIndex === index ? { ...item, category } : item);
  return transactions[index];
};
