import React from 'react';
import { Icons } from '../../../utils/icons';
import type { InventoryItem } from '../../../types/inventory';

interface InventoryActionsProps {
  items: InventoryItem[];
  onComplete: (items: InventoryItem[]) => void;
}

export function InventoryActions({ items, onComplete }: InventoryActionsProps) {
  const hasSpecialItems = items.some(item => 
    item.isFragile || item.requiresDisassembly || item.specialHandling
  );

  return (
    <div className="space-y-6">
      {hasSpecialItems && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icons.Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Special Items Detected</h4>
              <p className="text-sm text-blue-700">
                Your inventory includes items that may require special handling or additional services.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => onComplete(items)}
        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-teal-700 transition duration-200"
      >
        Get Estimate
      </button>
    </div>
  );
}