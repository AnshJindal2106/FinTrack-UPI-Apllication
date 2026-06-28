import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { TransactionsProvider } from './context/TransactionsContext.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TransactionsProvider><App /></TransactionsProvider>
  </React.StrictMode>,
);
