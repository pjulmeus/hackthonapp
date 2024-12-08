import React from 'react';
import type { InventoryItem } from '../../types/inventory';
import { categories } from '../../utils/inventory-constants';

interface InventoryListProps {
  items: InventoryItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function InventoryList({ items, onUpdateQuantity, onRemoveItem }: InventoryListProps) {
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  return (
    <div className="space-y-6">
      {categories.map(({ value: category, label }) => (
        itemsByCategory[category]?.length > 0 && (
          <div key={category} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{label}</h3>
            <div className="space-y-3">
              {itemsByCategory[category].map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div className="flex-1">
                    <span className="font-medium">
                      {item.name}
                      {item.bedSize && item.name.toLowerCase().includes('bed') && (
                        <span className="ml-2 text-sm text-gray-600">
                          ({item.bedSize.charAt(0).toUpperCase() + item.bedSize.slice(1)})
                        </span>
                      )}
                    </span>
                    <div className="text-sm text-gray-500">
                      {item.isFragile && <span className="mr-2">Fragile</span>}
                      {item.requiresDisassembly && <span className="mr-2">Needs Disassembly</span>}
                      {item.specialHandling && <span>Special Handling</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}