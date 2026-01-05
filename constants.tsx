
import React from 'react';

export const CATEGORIES: { label: string; value: string; color: string }[] = [
  { label: 'Housing', value: 'Housing', color: '#3b82f6' },
  { label: 'Food', value: 'Food', color: '#10b981' },
  { label: 'Transport', value: 'Transport', color: '#f59e0b' },
  { label: 'Entertainment', value: 'Entertainment', color: '#8b5cf6' },
  { label: 'Utilities', value: 'Utilities', color: '#ef4444' },
  { label: 'Health', value: 'Health', color: '#06b6d4' },
  { label: 'Other', value: 'Other', color: '#6b7280' },
];

export const Icons = {
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A5 5 0 0 1 12 7v5H7a5 5 0 0 1 0-10Z"/><path d="M14.5 2A5 5 0 0 0 12 7v5h5a5 5 0 0 0 0-10Z"/><path d="M9.5 22A5 5 0 0 0 12 17v-5H7a5 5 0 0 0 0 10Z"/><path d="M14.5 22A5 5 0 0 1 12 17v-5h5a5 5 0 0 1 0 10Z"/></svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
  ),
};
