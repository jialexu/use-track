'use client';

import React, { useState, useEffect } from 'react';
import { transactionsApi } from '@/services/api';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Transaction {
  id: string;
  datetime: string;
  merchant: string;
  total_amount: number;
  currency: string;
  category: string;
  note: string;
  tags: string[];
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionsApi.findAll(skip, 20);
        setTransactions(response.data);
        setTotal(response.total);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [skip]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <button className="button button-primary">+ New Transaction</button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Date</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Merchant</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Category</th>
                    <th className="text-right px-6 py-3 text-sm font-semibold text-gray-900">Amount</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{formatDate(tx.datetime)}</td>
                      <td className="px-6 py-4 text-sm">{tx.merchant}</td>
                      <td className="px-6 py-4 text-sm">{tx.category}</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold">
                        {formatCurrency(tx.total_amount, tx.currency)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-1 flex-wrap">
                          {tx.tags?.map((tag) => (
                            <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {transactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No transactions yet. Create your first transaction!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
