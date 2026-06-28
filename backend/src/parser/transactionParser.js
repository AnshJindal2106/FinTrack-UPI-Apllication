import { CATEGORY_KEYWORDS, REWARD_KEYWORDS, REWARD_RATE } from '../config/constants.js';
import { roundCurrency } from '../utils/currency.js';

const includesKeyword = (message, keywords) => keywords.some((keyword) => message.includes(keyword));

export const categorizeMessage = (rawMessage) => {
  const normalized = rawMessage.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (includesKeyword(normalized, keywords)) return category;
  }
  return 'Miscellaneous';
};

export const calculateExpectedSavings = (rawMessage, amount) => {
  const eligible = amount < 0 && includesKeyword(rawMessage.toLowerCase(), REWARD_KEYWORDS);
  return eligible ? roundCurrency(Math.abs(amount) * REWARD_RATE) : null;
};

export const extractDisplayName = (rawMessage) => {
  const match = rawMessage.match(/(?:to|from)\s+(.+?)(?:\s+via\s+UPI)?$/i);
  return match?.[1]?.trim() ?? rawMessage.replace(/^(?:Paid|Received)\s+Rs\.?[\d,.]+\s*/i, '').trim();
};

export const extractAmount = (rawMessage) => {
  const match = rawMessage.match(/(?:Rs\.?|₹)\s*([\d,]+(?:\.\d{1,2})?)/i);
  if (!match) {
    const error = new Error('Include an amount such as Rs.250 or ₹250.');
    error.status = 400;
    throw error;
  }

  const value = Number(match[1].replaceAll(',', ''));
  const normalized = rawMessage.trim().toLowerCase();
  if (/^(received|credited|got)\b/.test(normalized)) return Math.abs(value);
  if (/^(paid|sent|debited)\b/.test(normalized)) return -Math.abs(value);

  const error = new Error('Start the sentence with Paid or Received so the transaction type is clear.');
  error.status = 400;
  throw error;
};

export const parseRawMessage = (rawMessage) => {
  const message = rawMessage?.trim();
  if (!message || message.length < 8) {
    const error = new Error('Enter a complete transaction sentence.');
    error.status = 400;
    throw error;
  }

  return parseTransaction({
    id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    rawMessage: message,
    amount: extractAmount(message),
    date: new Date().toISOString(),
  });
};

export const parseTransaction = (transaction) => ({
  ...transaction,
  type: transaction.amount >= 0 ? 'income' : 'expense',
  category: transaction.category ?? categorizeMessage(transaction.rawMessage),
  expectedSavings: calculateExpectedSavings(transaction.rawMessage, transaction.amount),
  displayName: extractDisplayName(transaction.rawMessage),
});
