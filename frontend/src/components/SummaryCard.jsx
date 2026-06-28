import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, PiggyBank, WalletCards } from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const styles = {
  income: { 
    icon: ArrowDownLeft, 
    gradient: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400'
  },
  expense: { 
    icon: ArrowUpRight, 
    gradient: 'from-rose-400 to-red-500',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    text: 'text-rose-600 dark:text-rose-400'
  },
  savings: { 
    icon: PiggyBank, 
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400'
  },
  balance: { 
    icon: WalletCards, 
    gradient: 'from-indigo-400 to-violet-500',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    text: 'text-indigo-600 dark:text-indigo-400'
  }
};

export default function SummaryCard({ label, value, type, index }) {
  const { icon: Icon, gradient, bg, text } = styles[type];
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card relative overflow-hidden p-6"
    >
      {/* Glow Effect */}
      <div className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-xl`} />
      
      <div className="flex items-start justify-between">
        <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon size={28} />
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className={`mt-2 text-3xl font-bold tracking-tight ${text}`}>
          {formatCurrency(value)}
        </p>
      </div>
    </motion.article>
  );
}
