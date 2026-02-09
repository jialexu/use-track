'use client';

import React, { useState, useEffect } from 'react';
import { watchlistsApi } from '@/services/api';
import { formatCurrency } from '@/lib/utils';

interface Watchlist {
  id: string;
  name: string;
  url: string;
  current_price?: number;
  target_price?: number;
  currency: string;
  vendor: string;
  status: string;
  priority: number;
}

export default function WatchlistsPage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const response = await watchlistsApi.findAll(skip, 20);
        setWatchlists(response.data);
        setTotal(response.total);
      } catch (error) {
        console.error('Failed to fetch watchlists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlists();
  }, [skip]);

  const getPriceStatus = (current?: number, target?: number) => {
    if (!current || !target) return 'N/A';
    if (current <= target) return '✓ Achieved!';
    const remaining = current - target;
    const percent = ((remaining / target) * 100).toFixed(0);
    return `${percent}% above target`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Watchlists</h1>
          <button className="button button-primary">+ New Watchlist</button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {watchlists.map((watch) => (
              <div key={watch.id} className="card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{watch.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    watch.status === 'watching' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {watch.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 truncate">
                  <a href={watch.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {watch.vendor}
                  </a>
                </p>

                <div className="space-y-2 mb-4 text-sm">
                  {watch.current_price && (
                    <p>
                      Current: <span className="font-semibold">{formatCurrency(watch.current_price, watch.currency)}</span>
                    </p>
                  )}
                  {watch.target_price && (
                    <p>
                      Target: <span className="font-semibold">{formatCurrency(watch.target_price, watch.currency)}</span>
                    </p>
                  )}
                  <p className={watch.current_price && watch.target_price && watch.current_price <= watch.target_price ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                    {getPriceStatus(watch.current_price, watch.target_price)}
                  </p>
                  <p className="text-gray-600">Priority: {watch.priority}/10</p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 button button-secondary text-sm">Update Price</button>
                  <button className="flex-1 button button-secondary text-sm">Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {watchlists.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">No watchlists yet. Create your first watchlist!</p>
          </div>
        )}
      </div>
    </div>
  );
}
