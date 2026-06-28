import { motion } from 'framer-motion';
import { Banknote, Car, ShoppingBag, Utensils } from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const config = {
  'Food & Dining': { 
    Icon: Utensils, 
    gradient: 'from-orange-400 to-rose-500', 
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    text: 'text-orange-600 dark:text-orange-400'
  },
  Travel: { 
    Icon: Car, 
    gradient: 'from-sky-400 to-cyan-500', 
    bg: 'bg-sky-50 dark:bg-sky-500/10',
    text: 'text-sky-600 dark:text-sky-400'
  },
  Salary: { 
    Icon: Banknote, 
    gradient: 'from-emerald-400 to-teal-500', 
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400'
  },
  Miscellaneous: { 
    Icon: ShoppingBag, 
    gradient: 'from-violet-400 to-fuchsia-500', 
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400'
  }
};

export default function CategoryCard({ category, amount, maximum, index }) {
  const { Icon, gradient, bg, text } = config[category];
  const percentage = maximum ? Math.round((amount / maximum) * 100) : 0;
  
  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-4">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl ${bg} ${text}`}>
          <Icon size={24} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{category}</h4>
            <span className={`text-sm font-bold ${text}`}>{percentage}%</span>
          </div>
          
          <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
            {formatCurrency(amount)}
          </p>
          
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ 
                duration: 1, 
                delay: 0.4 + index * 0.1, 
                ease: 'easeOut' 
              }}
              className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
