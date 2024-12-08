import React from 'react';
import type { ItemCategory } from '../../../types/inventory';
import { categories } from '../../../utils/inventory-constants';

interface CategorySelectProps {
  value: ItemCategory;
  onChange: (category: ItemCategory) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value as ItemCategory)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}