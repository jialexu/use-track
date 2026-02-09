'use client';

import React, { useState, useEffect } from 'react';
import { itemsApi, usageLogsApi } from '@/services/api';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Item {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  purchase_price: number;
  purchase_date: string;
  quantity: number;
  status: string;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string>();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemsApi.findAll(skip, 20, selectedStatus);
        setItems(response.data);
        setTotal(response.total);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [skip, selectedStatus]);

  const handleQuickLog = async (itemId: string) => {
    try {
      await usageLogsApi.quickLog(itemId, 1);
      // Refresh items
      const response = await itemsApi.findAll(skip, 20, selectedStatus);
      setItems(response.data);
    } catch (error) {
      console.error('Failed to log usage:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Items</h1>
          <button className="button button-primary">+ Add Item</button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setSelectedStatus(undefined)}
            className={`px-4 py-2 rounded-lg ${!selectedStatus ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}
          >
            All
          </button>
          {['active', 'sold', 'broken'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg capitalize ${selectedStatus === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                {item.brand && <p className="text-sm text-gray-600 mb-2">{item.brand}</p>}
                <div className="space-y-1 mb-4 text-sm text-gray-600">
                  <p>Category: {item.category || 'N/A'}</p>
                  <p>Purchase: {formatDate(item.purchase_date)}</p>
                  <p>Price: {formatCurrency(item.purchase_price)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: <span className="font-semibold">{item.status}</span></p>
                </div>
                <button
                  onClick={() => handleQuickLog(item.id)}
                  className="w-full button button-primary"
                >
                  + Log Usage
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">No items found. Add your first item!</p>
          </div>
        )}
      </div>
    </div>
  );
}
