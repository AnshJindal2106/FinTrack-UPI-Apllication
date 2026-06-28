import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Sparkles, X, Loader2, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTransactions } from '../context/TransactionsContext.jsx';

const examples = [
  'Paid Rs.250 to Zomato via UPI',
  'Received Rs.25000 from ABC Pvt Ltd',
  'Paid Rs.900 to Swiggy Cashback Offer',
  'Paid Rs.430 to Uber',
  'Paid Rs.1200 to Amazon Pay Rewards',
];

export default function AddTransactionModal({ open, onClose }) {
  const { addTransaction, creating } = useTransactions();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const handleKey = (event) => event.key === 'Escape' && !creating && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, creating, onClose]);

  const closeModal = () => {
    if (creating) return;
    setMessage('');
    setError('');
    onClose();
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await addTransaction(message);
      closeModal();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4 backdrop-blur-md"
          onMouseDown={(e) => e.target === e.currentTarget && closeModal()}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-transaction-title"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-indigo-600 shadow-lg">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                      Smart Transaction Entry
                    </p>
                    <h2
                      id="add-transaction-title"
                      className="mt-1 text-2xl font-bold text-white"
                    >
                      Add a Transaction
                    </h2>
                    <p className="mt-2 text-sm text-white/70 max-w-md">
                      Write it naturally. We'll parse everything securely on the backend!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={closeModal}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 text-white transition hover:bg-white/30"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
              {/* Text Area */}
              <div>
                <label
                  htmlFor="transaction-message"
                  className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2"
                >
                  Transaction Details
                </label>
                <textarea
                  id="transaction-message"
                  autoFocus
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g., Paid Rs.250 to Zomato via UPI"
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-relaxed text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              {/* Tip */}
              <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
                <Lightbulb size={20} className="mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  Start with <strong>"Paid"</strong> for expenses or <strong>"Received"</strong> for
                  income, and include an amount with "Rs." or "₹".
                </p>
              </div>

              {/* Examples */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Try an example
                </p>
                <div className="flex flex-wrap gap-2">
                  {examples.map((example) => (
                    <button
                      type="button"
                      key={example}
                      onClick={() => {
                        setMessage(example);
                        setError('');
                      }}
                      className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-left text-sm font-semibold text-indigo-700 transition hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <p
                  role="alert"
                  className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
                >
                  {error}
                </p>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={creating}
                  className="rounded-2xl px-6 py-3 text-base font-bold text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !message.trim()}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 px-8 py-3 text-base font-bold text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {creating ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Plus size={20} />
                  )}
                  {creating ? 'Adding...' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
