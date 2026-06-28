import { Inbox, RotateCcw, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTransactions } from '../context/TransactionsContext.jsx';
import Filters from './Filters.jsx';
import TransactionCard from './TransactionCard.jsx';

export default function TransactionTimeline() {
  const { transactions, loading, error, retry, resetFilters } = useTransactions();
  
  return (
    <section className="glass-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Transaction Timeline</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track your money flow</p>
          </div>
        </div>
        
        {!loading && !error && (
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            {transactions.length} Transactions
          </span>
        )}
      </div>
      
      <Filters />
      
      <div className="mt-6 max-h-[650px] space-y-4 overflow-y-auto pr-2 scrollbar">
        {loading && (
          Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="animate-pulse rounded-2xl bg-white/60 p-5 dark:bg-white/5"
            >
              <div className="flex gap-4">
                <div className="h-14 w-14 rounded-2xl bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-2/5 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="h-10 w-full rounded bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>
            </motion.div>
          ))
        )}
        
        {error && !loading && (
          <div className="grid min-h-[300px] place-items-center text-center">
            <div>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-rose-100 text-rose-500 dark:bg-rose-500/10">
                <RotateCcw size={32} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-white">
                Couldn't load transactions
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">{error}</p>
              <button
                onClick={() => retry()}
                className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        
        {!loading && !error && transactions.length === 0 && (
          <div className="grid min-h-[300px] place-items-center text-center">
            <div>
              <Inbox className="mx-auto text-slate-300 dark:text-slate-600" size={56} />
              <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-white">
                No transactions yet
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Start by adding your first transaction!
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 text-sm font-bold text-indigo-600 dark:text-indigo-400"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
        
        <AnimatePresence>
          {!loading && !error && transactions.map((transaction, index) => (
            <TransactionCard 
              key={transaction.id} 
              transaction={transaction} 
              index={index} 
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
