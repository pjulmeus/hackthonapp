import React from 'react';
import { Icons } from '../../utils/icons';

export function EstimateDisclaimer() {
  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <div className="flex items-start space-x-4">
        <Icons.AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h4 className="text-lg font-semibold text-blue-900 mb-2">
            Important Information About Your Estimate
          </h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              This is a non-binding estimate based on the information provided. The final cost may vary based on:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Actual time required to complete the move</li>
              <li>Additional items not included in the inventory</li>
              <li>Parking or access restrictions at either location</li>
              <li>Weather conditions or other unforeseen circumstances</li>
              <li>Additional packing materials required</li>
              <li>Changes to the move date or locations</li>
            </ul>
            <p className="mt-4">
              A final binding estimate will be provided after an in-person or virtual assessment of your items and locations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}