import React, { useState } from 'react';
import type { ItemCategory } from '../../../types/inventory';
import { furnitureCategories } from '../../../utils/furniture-categories';
import { electronicsItems } from '../../../utils/electronics-items';
import { applianceItems } from '../../../utils/appliance-items';
import { specialtyItems } from '../../../utils/specialty-items';

interface ItemNameInputProps {
  category: ItemCategory;
  value: string;
  onChange: (name: string) => void;
}

export function ItemNameInput({ category, value, onChange }: ItemNameInputProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);

  const getItemsList = () => {
    switch (category) {
      case 'furniture':
        return furnitureCategories.flatMap(category => [
          { value: `header-${category.room}`, label: category.room, isHeader: true },
          ...category.items.map(item => ({ value: item, label: item, isHeader: false }))
        ]);
      case 'electronics':
        return electronicsItems.map(item => ({ value: item, label: item, isHeader: false }));
      case 'appliances':
        return applianceItems.map(item => ({ value: item, label: item, isHeader: false }));
      case 'specialty':
        return specialtyItems.map(item => ({ value: item, label: item, isHeader: false }));
      default:
        return [];
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case 'furniture':
        return 'Furniture Item';
      case 'electronics':
        return 'Electronic Item';
      case 'appliances':
        return 'Appliance';
      case 'specialty':
        return 'Specialty Item';
      default:
        return 'Item Name';
    }
  };

  const items = getItemsList();

  if (showCustomInput) {
    return (
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Custom {getCategoryLabel()}
        </label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            id="name"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowCustomInput(false)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (items.length > 0) {
    return (
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {getCategoryLabel()}
        </label>
        <select
          id="name"
          value={value}
          onChange={(e) => {
            if (e.target.value === 'custom') {
              setShowCustomInput(true);
              onChange('');
            } else if (!e.target.value.startsWith('header-')) {
              onChange(e.target.value);
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select an item...</option>
          {items.map((item, index) => (
            item.isHeader ? (
              <option 
                key={item.value} 
                value={item.value} 
                disabled 
                className="font-semibold bg-gray-100"
                style={{ color: '#666' }}
              >
                ── {item.label} ──
              </option>
            ) : (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            )
          ))}
          <option value="custom">Other (Custom Item)</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Item Name
      </label>
      <input
        type="text"
        id="name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
}