export const formatCurrency = (value, compact = false) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  ...(compact ? { notation: 'compact' } : {}),
}).format(value ?? 0);

export const formatDate = (value) => new Intl.DateTimeFormat('en-IN', {
  day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit',
}).format(new Date(value));
