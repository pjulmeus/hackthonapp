import React from 'react';
import { Icons } from '../../../utils/icons';

interface EstimateBreakdownItemProps {
  label: string;
  amount: number;
  showInfo?: boolean;
}

export function EstimateBreakdownItem({ label, amount, showInfo = true }: EstimateBreakdownItemProps) {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center">
        <span>{label}</span>
        {showInfo && <Icons.Info size={16} className="text-gray-400 ml-2" />}
      </div>
      <span className="font-semibold">${amount.toFixed(2)}</span>
    </div>
  );
}