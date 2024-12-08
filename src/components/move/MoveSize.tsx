import React from 'react';
import type { Address } from '../../types';

interface MoveSizeProps {
  value: Address['size'];
  onChange: (size: Address['size']) => void;
}

export function MoveSize({ value, onChange }: MoveSizeProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="size" className="block text-sm font-medium text-gray-700">
        Home Size
      </label>
      <select
        id="size"
        value={value}
        onChange={(e) => onChange(e.target.value as Address['size'])}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="studio">Studio</option>
        <option value="1-bedroom">1 Bedroom</option>
        <option value="1.5-bedroom">1.5 Bedrooms</option>
        <option value="2-bedroom">2 Bedrooms</option>
        <option value="3-bedroom">3 Bedrooms</option>
        <option value="4-bedroom">4 Bedrooms</option>
        <option value="5plus-bedroom">5+ Bedrooms</option>
      </select>
    </div>
  );
}