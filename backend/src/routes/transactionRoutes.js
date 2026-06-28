import { Router } from 'express';
import { createTransaction, listTransactions, patchTransaction, showSummary } from '../controllers/transactionController.js';

const router = Router();
router.get('/transactions', listTransactions);
router.get('/summary', showSummary);
router.post('/transaction', createTransaction);
router.patch('/transaction/:id', patchTransaction);
export default router;
