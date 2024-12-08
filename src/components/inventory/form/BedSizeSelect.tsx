import React from 'react';
import type { BedSize } from '../../../types/inventory';

interface BedSizeSelectProps {
  value: BedSize;
  onChange: (size: BedSize) => void;
}

export function BedSizeSelect({ value, onChange }: BedSizeSelectProps) {
  return (
    <div>
      <label htmlFor="bedSize" className="block text-sm font-medium text-gray-700">
        Bed Size
      </label>
      <select
        id="bedSize"
        value={value}
        onChange={(e) => onChange(e.target.value as BedSize)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="twin">Twin</option>
        <option value="full">Full</option>
        <option value="queen">Queen</option>
        <option value="king">King</option>
      </select>
    </div>
  );
}