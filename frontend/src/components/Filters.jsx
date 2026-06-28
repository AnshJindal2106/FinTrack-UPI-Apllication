import { ArrowDownWideNarrow, Search, SlidersHorizontal, X } from 'lucide-react';
import { useTransactions } from '../context/TransactionsContext.jsx';

const categories = ['all', 'Food & Dining', 'Travel', 'Salary', 'Miscellaneous'];

export default function Filters() {
  const { filters, updateFilter, resetFilters } = useTransactions();
  const isActive = Object.entries(filters).some(
    ([key, value]) => value !== ({ search: '', category: 'all', type: 'all', sortBy: 'date', order: 'desc' })[key]
  );

  return (
    <div className="mt-5 grid gap-3 md:grid-cols-[minmax(220px,1fr)_auto_auto_auto]">
      {/* Search */}
      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-400/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        <Search size={18} />
        <input
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Search merchant or message..."
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </label>

      {/* Category */}
      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-400/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        <SlidersHorizontal size={16} />
        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="bg-transparent font-semibold outline-none"
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value === 'all' ? 'All categories' : value}
            </option>
          ))}
        </select>
      </label>

      {/* Type */}
      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-400/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        <select
          value={filters.type}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="bg-transparent font-semibold outline-none"
        >
          <option value="all">All activity</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      {/* Sort */}
      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-400/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        <ArrowDownWideNarrow size={16} />
        <select
          value={`${filters.sortBy}-${filters.order}`}
          onChange={(e) => {
            const [sortBy, order] = e.target.value.split('-');
            updateFilter('sortBy', sortBy);
            updateFilter('order', order);
          }}
          className="bg-transparent font-semibold outline-none"
        >
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="amount-desc">Amount: High</option>
          <option value="amount-asc">Amount: Low</option>
        </select>
      </label>

      {isActive && (
        <button
          onClick={resetFilters}
          className="md:col-span-4 flex w-fit items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400"
        >
          <X size={16} /> Clear all filters
        </button>
      )}
    </div>
  );
}
