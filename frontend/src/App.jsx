import { useEffect, useMemo, useState } from 'react';
import { 
  LayoutDashboard, 
  ReceiptText, 
  BarChart3, 
  Gift as GiftIcon, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  User, 
  Plus,
  Sparkles,
  Calendar,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import AddTransactionModal from './components/AddTransactionModal.jsx';
import CategoryCard from './components/CategoryCard.jsx';
import CategoryChart from './components/CategoryChart.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import TransactionTimeline from './components/TransactionTimeline.jsx';
import { useTransactions } from './context/TransactionsContext.jsx';

const categories = ['Food & Dining', 'Travel', 'Salary', 'Miscellaneous'];
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ReceiptText, label: 'Transactions', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: GiftIcon, label: 'Rewards', active: false }
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function formatCurrentDate() {
  return new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default function App() {
  const { summary, loading } = useTransactions();
  const [dark, setDark] = useState(() => localStorage.getItem('upi-theme') === 'dark');
  const [addOpen, setAddOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('upi-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const maximum = useMemo(() => Math.max(...Object.values(summary?.categoryTotals ?? { empty: 0 })), [summary]);
  
  const cards = [
    ['Income', summary?.income, 'income'], 
    ['Expense', summary?.expense, 'expense'],
    ['Expected Savings', summary?.expectedSavingsTotal, 'savings'], 
    ['Net Balance', summary?.netBalance, 'balance'],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 text-slate-900 transition-all duration-500 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
      {/* Background Decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-emerald-400/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-violet-400/20 to-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-amber-400/10 to-pink-400/10 blur-3xl" />
      </div>

      {/* Sticky Navigation Bar */}
      <motion.header 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Left: Logo & Name */}
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }} 
              className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 text-white shadow-xl"
            >
              <Sparkles size={24} />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FinTrack Pro</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Your financial companion</p>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden items-center gap-2 rounded-2xl bg-slate-100/60 p-2 backdrop-blur-sm md:flex dark:bg-white/5">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveNav(item.label)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeNav === item.label 
                    ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-lg' 
                    : 'text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-white/10'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <Search size={20} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDark((prev) => !prev)}
              className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg"
            >
              <User size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-5 py-2.5 font-semibold text-white shadow-xl transition-all hover:shadow-2xl"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Transaction</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-7xl px-6 py-10">
        {/* Welcome Header for Dashboard */}
        {activeNav === "Dashboard" && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{getGreeting()} 👋</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back!</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Here's your financial overview for today</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/60 px-5 py-3 shadow-sm backdrop-blur-xl dark:bg-white/5">
              <Calendar className="text-indigo-500" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{formatCurrentDate()}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> Last updated just now
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Dashboard Section */}
        {activeNav === "Dashboard" && (
          <>
            {/* Summary Cards */}
            <section className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {cards.map(([label, value, type], index) => (
                loading && !summary ? (
                  <motion.div 
                    key={label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card h-44 animate-pulse"
                  />
                ) : (
                  <SummaryCard key={label} label={label} value={value} type={type} index={index} />
                )
              ))}
            </section>

            {/* Analytics & Transactions */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column: Category Progress & Chart */}
              <div className="space-y-8 lg:col-span-1">
                {/* Category Progress Cards */}
                <section className="space-y-3">
                  <h3 className="text-lg font-bold">Category Progress</h3>
                  {categories.map((category, index) => (
                    <CategoryCard key={category} category={category} amount={summary?.categoryTotals?.[category] ?? 0} maximum={maximum} index={index} />
                  ))}
                </section>

                {/* Pie Chart */}
                <CategoryChart totals={summary?.categoryTotals} />
              </div>

              {/* Right Column: Transaction Timeline */}
              <div className="lg:col-span-2">
                <TransactionTimeline />
              </div>
            </div>
          </>
        )}

        {/* Transactions Section */}
        {activeNav === "Transactions" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="mb-6 text-3xl font-bold tracking-tight">All Transactions</h2>
            <TransactionTimeline />
          </motion.div>
        )}

        {/* Analytics Section */}
        {activeNav === "Analytics" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8"
          >
            <h2 className="mb-2 text-3xl font-bold tracking-tight">Analytics</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {cards.map(([label, value, type], index) => (
                loading && !summary ? (
                  <motion.div 
                    key={label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card h-44 animate-pulse"
                  />
                ) : (
                  <SummaryCard key={label} label={label} value={value} type={type} index={index} />
                )
              ))}
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Category Progress</h3>
                {categories.map((category, index) => (
                  <CategoryCard key={category} category={category} amount={summary?.categoryTotals?.[category] ?? 0} maximum={maximum} index={index} />
                ))}
              </div>
              <CategoryChart totals={summary?.categoryTotals} />
            </div>
          </motion.div>
        )}

        {/* Rewards Section (Placeholder) */}
        {activeNav === "Rewards" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-[60vh] place-items-center text-center"
          >
            <div>
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl">
                <GiftIcon size={48} />
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight">Coming Soon!</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Rewards program will be available in a future update</p>
            </div>
          </motion.div>
        )}

        <footer className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
          FinTrack Pro · Built with ❤️ for financial clarity
        </footer>
      </main>

      <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
