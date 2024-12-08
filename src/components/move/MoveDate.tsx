import React from 'react';

interface MoveDateProps {
  value: string;
  onChange: (date: string) => void;
}

export function MoveDate({ value, onChange }: MoveDateProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="moveDate" className="block text-sm font-medium text-gray-700">
        Move Date
      </label>
      <input
        type="date"
        id="moveDate"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
}