import React from 'react';

interface TimePreferenceProps {
  value: string;
  onChange: (time: string) => void;
}

export function TimePreference({ value, onChange }: TimePreferenceProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">
        Preferred Move Time
      </label>
      <select
        id="preferredTime"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select preferred time...</option>
        <option value="morning">Morning (8AM - 12PM)</option>
        <option value="afternoon">Afternoon (12PM - 4PM)</option>
        <option value="evening">Evening (4PM - 8PM)</option>
      </select>
    </div>
  );
}