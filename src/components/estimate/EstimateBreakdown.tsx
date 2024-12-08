import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../../utils/icons';

interface EstimateBreakdownProps {
  baseRate: number;
  additionalFees: Record<string, number>;
  totalEstimate: number;
}

export function EstimateBreakdown({
  baseRate,
  additionalFees,
  totalEstimate,
}: EstimateBreakdownProps) {
  const formatFeeLabel = (key: string): string => {
    const labels: Record<string, string> = {
      stairFee: 'Stair Fee',
      specialtyFee: 'Specialty Items Fee',
      longDistanceFee: 'Long Distance Fee',
      insuranceFee: 'Insurance',
      weekendFee: 'Weekend Rate',
      peakSeasonFee: 'Peak Season Rate',
    };
    return labels[key] || key;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Cost Breakdown</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <span>Base Rate</span>
            <Icons.Info size={16} className="text-gray-400 ml-2" />
          </div>
          <span className="font-semibold">${baseRate.toFixed(2)}</span>
        </div>

        {Object.entries(additionalFees).map(([fee, amount]) => (
          <motion.div
            key={fee}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-center py-2 border-t"
          >
            <div className="flex items-center">
              <span>{formatFeeLabel(fee)}</span>
              <Icons.Info size={16} className="text-gray-400 ml-2" />
            </div>
            <span className="font-semibold">${amount.toFixed(2)}</span>
          </motion.div>
        ))}

        <div className="flex justify-between items-center py-4 border-t-2 border-gray-200 mt-4">
          <span className="text-lg font-bold">Total Estimate</span>
          <span className="text-lg font-bold text-teal-600">
            ${totalEstimate.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}