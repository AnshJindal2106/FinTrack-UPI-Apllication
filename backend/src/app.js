import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5174' }));
app.use(express.json({ limit: '32kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/api', transactionRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
