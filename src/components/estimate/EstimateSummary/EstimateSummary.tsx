import React from 'react';
import { EstimateSummaryCard } from './EstimateSummaryCard';
import type { MoveDetails } from '../../../types';

interface EstimateSummaryProps {
  totalEstimate: number;
  estimatedHours: number;
  distance: number;
  moveDetails: MoveDetails;
}

export function EstimateSummary({ 
  totalEstimate, 
  estimatedHours, 
  distance, 
  moveDetails 
}: EstimateSummaryProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">Your Moving Estimate</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EstimateSummaryCard
          icon="DollarSign"
          value={`$${totalEstimate.toFixed(2)}`}
          label="Total Estimate"
        />
        <EstimateSummaryCard
          icon="Clock"
          value={`${estimatedHours} hours`}
          label="Estimated Duration"
        />
        <EstimateSummaryCard
          icon="Truck"
          value={`${distance} miles`}
          label="Total Distance"
        />
        <EstimateSummaryCard
          icon="Calendar"
          value={new Date(moveDetails.moveDate).toLocaleDateString()}
          label="Move Date"
        />
      </div>
    </div>
  );
}