import { addTransaction, getSummary, queryTransactions, updateTransactionCategory } from '../services/transactionService.js';

export const listTransactions = (request, response) => {
  response.json({ transactions: queryTransactions(request.query), summary: getSummary() });
};

export const showSummary = (_request, response) => response.json(getSummary());

export const createTransaction = (request, response, next) => {
  try {
    const transaction = addTransaction(request.body.rawMessage);
    response.status(201).json({ transaction, summary: getSummary() });
  } catch (error) {
    next(error);
  }
};

export const patchTransaction = (request, response, next) => {
  try {
    const transaction = updateTransactionCategory(request.params.id, request.body.category);
    response.json({ transaction, summary: getSummary() });
  } catch (error) {
    next(error);
  }
};
