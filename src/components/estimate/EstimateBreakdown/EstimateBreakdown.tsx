import React from 'react';
import { motion } from 'framer-motion';
import { EstimateBreakdownItem } from './EstimateBreakdownItem';
import { TotalEstimate } from './TotalEstimate';
import { formatFeeLabel } from '../../../utils/estimate/labels';

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
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Cost Breakdown</h3>
      
      <div className="space-y-4">
        <EstimateBreakdownItem label="Base Rate" amount={baseRate} />

        {Object.entries(additionalFees).map(([fee, amount]) => (
          <motion.div
            key={fee}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <EstimateBreakdownItem 
              label={formatFeeLabel(fee)} 
              amount={amount} 
            />
          </motion.div>
        ))}

        <TotalEstimate amount={totalEstimate} />
      </div>
    </div>
  );
}