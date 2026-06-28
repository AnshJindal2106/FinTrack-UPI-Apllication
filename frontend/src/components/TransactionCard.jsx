import { motion } from 'framer-motion';
import { 
  Utensils, 
  Car, 
  Briefcase, 
  ShoppingBag, 
  Gift, 
  Loader2,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';
import { useTransactions } from '../context/TransactionsContext.jsx';
import { formatCurrency, formatDate } from '../utils/formatters.js';

const categories = ['Food & Dining', 'Travel', 'Salary', 'Miscellaneous'];

const categoryIcons = {
  'Food & Dining': { Icon: Utensils, bg: 'bg-orange-100', text: 'text-orange-600', darkBg: 'bg-orange-500/10', darkText: 'text-orange-400' },
  'Travel': { Icon: Car, bg: 'bg-sky-100', text: 'text-sky-600', darkBg: 'bg-sky-500/10', darkText: 'text-sky-400' },
  'Salary': { Icon: Briefcase, bg: 'bg-emerald-100', text: 'text-emerald-600', darkBg: 'bg-emerald-500/10', darkText: 'text-emerald-400' },
  'Miscellaneous': { Icon: ShoppingBag, bg: 'bg-violet-100', text: 'text-violet-600', darkBg: 'bg-violet-500/10', darkText: 'text-violet-400' }
};

export default function TransactionCard({ transaction, index }) {
  const { updateCategory, updatingId } = useTransactions();
  const [localCategory, setLocalCategory] = useState(transaction.category);
  const isIncome = transaction.type === 'income';
  const isPending = updatingId === transaction.id;
  const { Icon, bg, text, darkBg, darkText } = categoryIcons[localCategory];

  const handleCategoryChange = async (event) => {
    const nextCategory = event.target.value;
    const previous = localCategory;
    setLocalCategory(nextCategory);
    try {
      await updateCategory(transaction.id, nextCategory);
    } catch {
      setLocalCategory(previous);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: Math.min(index * 0.05, 0.3), 
        type: 'spring', 
        stiffness: 300 
      }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`glass-card relative overflow-hidden border-l-4 ${
        isIncome ? 'border-l-emerald-500' : 'border-l-rose-500'
      } p-5`}
    >
      <div className="flex gap-4">
        {/* Category Icon */}
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${bg} ${text} dark:${darkBg} dark:${darkText}`}>
          <Icon size={28} />
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-slate-800 dark:text-white">
                {transaction.displayName}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {formatDate(transaction.date)}
              </p>
            </div>
            
            {/* Amount */}
            <div className="text-right">
              <p className={`text-xl font-bold ${
                isIncome 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-800 dark:text-white'
              }`}>
                {isIncome ? '+' : '−'}{formatCurrency(Math.abs(transaction.amount))}
              </p>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                isIncome 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
              }`}>
                {isIncome ? <ArrowDownLeft size={12} /> : <ArrowUpRight size={12} />}
                {isIncome ? 'Income' : 'Expense'}
              </span>
            </div>
          </div>
          
          {/* Raw Message */}
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {transaction.rawMessage}
          </p>
          
          {/* Category Selector */}
          <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
            <div className="relative flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Category:</span>
              <div className="relative">
                <select
                  aria-label={`Change category for ${transaction.displayName}`}
                  disabled={isPending}
                  value={localCategory}
                  onChange={handleCategoryChange}
                  className="appearance-none rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 outline-none ring-indigo-400 focus:ring-2 disabled:opacity-50 dark:bg-white/10 dark:text-slate-200 pr-8"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {isPending && (
                  <Loader2 
                    size={16} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-indigo-500" 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expected Savings */}
      {transaction.expectedSavings != null && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 dark:from-emerald-500/10 dark:to-teal-500/10"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            <Gift size={18} />
            Expected Savings
          </span>
          <strong className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
            +{formatCurrency(transaction.expectedSavings)}
          </strong>
        </motion.div>
      )}
    </motion.article>
  );
}
