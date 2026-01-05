
export type Category = 'Housing' | 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Health' | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
}

export interface InsightResponse {
  summary: string;
  recommendations: string[];
  totalSpent: number;
}
