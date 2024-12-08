import React from 'react';

interface StairsFormProps {
  hasStairs: boolean;
  flightCount: number;
  onChange: (stairs: { hasStairs: boolean; flightCount: number }) => void;
}

export function StairsForm({ hasStairs, flightCount, onChange }: StairsFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="hasStairs"
          checked={hasStairs}
          onChange={(e) => onChange({ hasStairs: e.target.checked, flightCount: e.target.checked ? flightCount : 0 })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="hasStairs" className="text-sm font-medium text-gray-700">
          This location has stairs
        </label>
      </div>

      {hasStairs && (
        <div>
          <label htmlFor="flightCount" className="block text-sm font-medium text-gray-700">
            Number of Flights
          </label>
          <input
            type="number"
            id="flightCount"
            min="1"
            max="20"
            value={flightCount}
            onChange={(e) => onChange({ hasStairs, flightCount: parseInt(e.target.value) || 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}