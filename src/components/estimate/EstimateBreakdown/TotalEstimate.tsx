import React from 'react';

interface TotalEstimateProps {
  amount: number;
}

export function TotalEstimate({ amount }: TotalEstimateProps) {
  return (
    <div className="flex justify-between items-center py-4 border-t-2 border-gray-200 mt-4">
      <span className="text-lg font-bold">Total Estimate</span>
      <span className="text-lg font-bold text-teal-600">
        ${amount.toFixed(2)}
      </span>
    </div>
  );
}