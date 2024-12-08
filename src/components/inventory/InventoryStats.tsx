import React from 'react';
import type { InventoryStats } from '../../types/inventory';
import { categories, sizes } from '../../utils/inventory-constants';

interface InventoryStatsProps {
  stats: InventoryStats;
}

export function InventoryStats({ stats }: InventoryStatsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal-500">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Items by Category</h4>
          <div className="space-y-2">
            {categories.map(({ value, label }) => (
              <div key={value} className="flex justify-between">
                <span className="text-gray-600">{label}</span>
                <span className="font-medium">{stats.itemsByCategory[value] || 0}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Items by Size</h4>
          <div className="space-y-2">
            {sizes.map(({ value, label }) => (
              <div key={value} className="flex justify-between">
                <span className="text-gray-600">{label}</span>
                <span className="font-medium">{stats.itemsBySize[value] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-3 rounded-md">
          <div className="text-sm text-gray-600">Total Items</div>
          <div className="text-xl font-semibold text-teal-700">{stats.totalItems}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-teal-50 p-3 rounded-md">
          <div className="text-sm text-gray-600">Fragile Items</div>
          <div className="text-xl font-semibold text-teal-700">{stats.fragileCount}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-teal-50 p-3 rounded-md">
          <div className="text-sm text-gray-600">Special Handling</div>
          <div className="text-xl font-semibold text-teal-700">{stats.specialHandlingCount}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-3 rounded-md">
          <div className="text-sm text-gray-600">Need Disassembly</div>
          <div className="text-xl font-semibold text-teal-700">{stats.disassemblyCount}</div>
        </div>
      </div>
    </div>
  );
}