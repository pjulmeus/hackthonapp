import React from 'react';

interface COIRequirementProps {
  value: boolean;
  onChange: (requiresCOI: boolean) => void;
}

export function COIRequirement({ value, onChange }: COIRequirementProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="requiresCOI"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div>
          <label htmlFor="requiresCOI" className="text-sm font-medium text-gray-700 block">
            Certificate of Insurance (COI) Required
          </label>
          <p className="text-sm text-gray-500">
            Check this if your building requires a Certificate of Insurance for moving
          </p>
        </div>
      </div>
    </div>
  );
}