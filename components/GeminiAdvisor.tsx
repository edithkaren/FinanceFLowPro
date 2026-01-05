
import React, { useState } from 'react';
import { getFinancialInsights } from '../services/geminiService';
import { Expense } from '../types';
import { Icons } from '../constants';

interface GeminiAdvisorProps {
  expenses: Expense[];
}

const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ expenses }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (expenses.length === 0) return;
    setLoading(true);
    try {
      const result = await getFinancialInsights(expenses);
      setInsight(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Icons.Brain />
          </div>
          <div>
            <h3 className="font-bold text-lg">AI Financial Advisor</h3>
            <p className="text-blue-100 text-sm">Powered by Gemini AI</p>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || expenses.length === 0}
          className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? 'Analyzing...' : 'Get Insights'}
        </button>
      </div>

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <p className="text-sm font-medium animate-pulse">Scanning your transaction history...</p>
        </div>
      )}

      {!loading && insight && (
        <div className="mt-6 bg-white/10 rounded-xl p-4 overflow-auto max-h-[400px] custom-scrollbar prose prose-invert prose-sm">
           <div dangerouslySetInnerHTML={{ __html: insight.replace(/\n/g, '<br/>') }} />
        </div>
      )}

      {!loading && !insight && (
        <div className="mt-4 p-4 border border-white/20 rounded-xl bg-white/5 italic text-sm text-blue-50">
          Click the button above to have Gemini analyze your spending habits and suggest budget optimizations.
        </div>
      )}
    </div>
  );
};

export default GeminiAdvisor;
