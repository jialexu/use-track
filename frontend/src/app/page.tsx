'use client';

import React, { useState, useEffect } from 'react';
import { dashboardApi } from '@/services/api';
import { formatCurrency } from '@/lib/utils';

interface HomeCard {
  monthly_expense: number;
  idle_items_count: number;
  price_drop_alerts: number;
}

export default function HomePage() {
  const [cards, setCards] = useState<HomeCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dashboardApi.getHomeCards();
        setCards(data);
      } catch (error) {
        console.error('Failed to fetch home cards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to UseTrack</h1>
          <p className="text-gray-600 mt-2">
            Track your spending and items intelligently
          </p>
        </div>

        {/* Home Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Monthly Expense Card */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">This Month's Expense</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatCurrency(cards?.monthly_expense || 0)}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Idle Items Card */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Idle Items (>30 days)</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {cards?.idle_items_count || 0}
                </p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4m0 0L4 7m16 0l-8 4m0 0l8 4m-8-4v10m0 0l-8-4m0 0V7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price Drop Alerts Card */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Price Drop Alerts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {cards?.price_drop_alerts || 0}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full button button-primary text-left">
                + Record Transaction
              </button>
              <button className="w-full button button-secondary text-left">
                + Add Item
              </button>
              <button className="w-full button button-secondary text-left">
                + Add to Watchlist
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
            <div className="space-y-2">
              <a href="/transactions" className="block button button-secondary text-left">
                View Transactions
              </a>
              <a href="/items" className="block button button-secondary text-left">
                View Items
              </a>
              <a href="/watchlists" className="block button button-secondary text-left">
                View Watchlists
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
