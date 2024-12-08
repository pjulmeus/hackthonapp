import React from 'react';
import { Icons } from '../../utils/icons';
import type { MoveDetails, InventoryItem } from '../../types';

interface ServiceRecommendationsProps {
  moveDetails: MoveDetails;
  items: InventoryItem[];
}

export function ServiceRecommendations({ moveDetails, items }: ServiceRecommendationsProps) {
  const hasFragileItems = items.some(item => item.isFragile);
  const hasLargeItems = items.some(item => item.size === 'large');
  const hasSpecialtyItems = items.some(item => item.category === 'specialty');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Recommended Additional Services</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hasFragileItems && (
          <div className="bg-gray-50 rounded-lg p-4">
            <Icons.Package className="w-8 h-8 text-teal-600 mb-2" />
            <h4 className="font-semibold mb-2">Professional Packing</h4>
            <p className="text-sm text-gray-600">
              Recommended for your fragile items to ensure safe transport
            </p>
          </div>
        )}

        {hasLargeItems && (
          <div className="bg-gray-50 rounded-lg p-4">
            <Icons.Wrench className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-semibold mb-2">Assembly/Disassembly</h4>
            <p className="text-sm text-gray-600">
              Professional handling of large furniture pieces
            </p>
          </div>
        )}

        {hasSpecialtyItems && (
          <div className="bg-gray-50 rounded-lg p-4">
            <Icons.Shield className="w-8 h-8 text-indigo-600 mb-2" />
            <h4 className="font-semibold mb-2">Additional Insurance</h4>
            <p className="text-sm text-gray-600">
              Extra coverage for your valuable specialty items
            </p>
          </div>
        )}
      </div>
    </div>
  );
}