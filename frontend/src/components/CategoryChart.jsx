import { motion } from 'framer-motion';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const colors = ['#fb923c', '#38bdf8', '#34d399', '#a78bfa'];

export default function CategoryChart({ totals }) {
  const data = Object.entries(totals ?? {}).map(([name, value]) => ({ name, value }));
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Category Mix</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Spending breakdown</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <PieChartIcon size={20} />
        </div>
      </div>
      
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={6}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <strong className="block text-3xl font-bold text-slate-800 dark:text-white">{data.length}</strong>
            <span className="text-sm text-slate-500 dark:text-slate-400">Categories</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            className="flex items-center gap-3 rounded-xl bg-white/50 p-3 dark:bg-white/5"
          >
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{formatCurrency(item.value)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
