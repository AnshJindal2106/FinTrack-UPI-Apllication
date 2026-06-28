const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message ?? 'Unable to reach your transaction service.');
  return data;
};

export const fetchTransactions = (filters, signal) => {
  const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== ''));
  return request(`/transactions?${params}`, { signal });
};

export const patchCategory = (id, category) => request(`/transaction/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ category }),
});

export const createTransaction = (rawMessage) => request('/transaction', {
  method: 'POST',
  body: JSON.stringify({ rawMessage }),
});
