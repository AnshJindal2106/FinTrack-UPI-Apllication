import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';
import { createTransaction as postTransaction, fetchTransactions, patchCategory } from '../services/api.js';

const TransactionsContext = createContext(null);
const initialFilters = { search: '', category: 'all', type: 'all', sortBy: 'date', order: 'desc' };

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const debouncedSearch = useDebouncedValue(filters.search);

  const load = useCallback(async (signal) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTransactions({ ...filters, search: debouncedSearch }, signal);
      setTransactions(data.transactions);
      setSummary(data.summary);
    } catch (requestError) {
      if (requestError.name !== 'AbortError') setError(requestError.message);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [filters.category, filters.type, filters.sortBy, filters.order, debouncedSearch]);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const updateCategory = async (id, category) => {
    setUpdatingId(id);
    setError('');
    try {
      const data = await patchCategory(id, category);
      setSummary(data.summary);
      setTransactions((items) => items.map((item) => item.id === id ? data.transaction : item));
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setUpdatingId(null);
    }
  };

  const addTransaction = async (rawMessage) => {
    setCreating(true);
    setError('');
    try {
      await postTransaction(rawMessage);
      await load();
    } finally {
      setCreating(false);
    }
  };

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const resetFilters = () => setFilters(initialFilters);
  const value = useMemo(() => ({ transactions, summary, filters, loading, updatingId, creating, error, updateFilter, resetFilters, updateCategory, addTransaction, retry: load }), [transactions, summary, filters, loading, updatingId, creating, error, load]);
  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error('useTransactions must be used inside TransactionsProvider');
  return context;
};
