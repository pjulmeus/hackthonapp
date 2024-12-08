import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../../utils/icons';
import type { MoveDetails, InventoryItem } from '../../types';
import { calculateTotalEstimate } from '../../utils/estimate-calculations';
import { EstimateBreakdown } from './EstimateBreakdown';
import { EstimateDisclaimer } from './EstimateDisclaimer';
import { ServiceRecommendations } from './ServiceRecommendations';
import { UserProfileForm } from '../profile/UserProfileForm';

interface EstimatePageProps {
  moveDetails: MoveDetails;
  items: InventoryItem[];
}

export function EstimatePage({ moveDetails, items }: EstimatePageProps) {
  const [showProfile, setShowProfile] = useState(false);
  const estimate = calculateTotalEstimate(moveDetails, items);

  const handleSaveComplete = () => {
    alert('Your quote has been saved! We will contact you shortly.');
  };

  if (showProfile) {
    return (
      <UserProfileForm 
        moveDetails={moveDetails}
        estimateDetails={estimate}
        inventoryItems={items}
        onComplete={handleSaveComplete}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Estimate Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Your Moving Estimate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Icons.DollarSign className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">${estimate.totalEstimate.toFixed(2)}</div>
              <div className="text-sm opacity-80">Total Estimate</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Icons.Clock className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">{estimate.estimatedHours} hours</div>
              <div className="text-sm opacity-80">Estimated Duration</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Icons.Truck className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">{estimate.distance} miles</div>
              <div className="text-sm opacity-80">Total Distance</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Icons.Calendar className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">
                {new Date(moveDetails.moveDate).toLocaleDateString()}
              </div>
              <div className="text-sm opacity-80">Move Date</div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <EstimateBreakdown
          baseRate={estimate.baseRate}
          additionalFees={estimate.additionalFees}
          totalEstimate={estimate.totalEstimate}
        />

        {/* Service Recommendations */}
        <ServiceRecommendations
          moveDetails={moveDetails}
          items={items}
        />

        {/* Disclaimer */}
        <EstimateDisclaimer />

        {/* Call to Action */}
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Move Forward?</h3>
          <p className="text-gray-600 mb-6">
            Lock in this estimate and schedule your move with Coastal Breeze Moving.
          </p>
          <button 
            onClick={() => setShowProfile(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Save Your Quote
          </button>
        </div>
      </motion.div>
    </div>
  );
}