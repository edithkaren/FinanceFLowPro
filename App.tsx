
import React, { useState, useEffect } from 'react';
import { Expense } from './types';
import { CATEGORIES, Icons } from './constants';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';
import GeminiAdvisor from './components/GeminiAdvisor';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data (Simulating Read from a database)
  useEffect(() => {
    const saved = localStorage.getItem('finance_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    } else {
      // Mock initial data
      const mockData: Expense[] = [
        { id: '1', amount: 1200, category: 'Housing', description: 'Rent Payment', date: '2023-11-01' },
        { id: '2', amount: 45.5, category: 'Food', description: 'Grocery Store', date: '2023-11-03' },
        { id: '3', amount: 30, category: 'Transport', description: 'Gasoline', date: '2023-11-04' },
      ];
      setExpenses(mockData);
    }
    setIsLoaded(true);
  }, []);

  // Sync to local storage on changes (Simulating Persistence)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('finance_expenses', JSON.stringify(expenses));
    }
  }, [expenses, isLoaded]);

  const handleAddExpense = (newExp: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExp,
      id: Math.random().toString(36).substr(2, 9),
    };
    setExpenses(prev => [expense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">F</div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">FinanceFlow <span className="text-blue-600">Pro</span></h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">LIVE SYNC</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Form and AI Advisor */}
          <div className="xl:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              <section>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Transaction Entry</h2>
                <ExpenseForm onAdd={handleAddExpense} />
              </section>

              <section>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Smart Insights</h2>
                <GeminiAdvisor expenses={expenses} />
              </section>
            </div>
          </div>

          {/* Right Column: Dashboard and List */}
          <div className="xl:col-span-8 space-y-8">
            <section>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Financial Dashboard</h2>
              <Dashboard expenses={expenses} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Recent Activity</h2>
                <span className="text-xs text-gray-400">{expenses.length} Total Transactions</span>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {expenses.length > 0 ? (
                        expenses.map((expense) => {
                          const category = CATEGORIES.find(c => c.value === expense.category);
                          return (
                            <tr key={expense.id} className="hover:bg-gray-50/80 transition-colors">
                              <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                {new Date(expense.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{expense.description}</td>
                              <td className="px-6 py-4">
                                <span 
                                  className="text-[10px] font-bold px-2 py-1 rounded-full uppercase"
                                  style={{ backgroundColor: `${category?.color}15`, color: category?.color }}
                                >
                                  {expense.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                                ${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <button
                                  onClick={() => handleDeleteExpense(expense.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                  title="Delete Transaction"
                                >
                                  <Icons.Trash />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                            No transactions recorded yet. Add your first expense above!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
