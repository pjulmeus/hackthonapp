import React, { useState } from 'react';
import { Icons } from '../../utils/icons';
import type { InventoryItem } from '../../types/inventory';

interface LegalAgreementProps {
  onAccept: (accepted: boolean) => void;
  accepted: boolean;
  inventoryItems: InventoryItem[];
}

export function LegalAgreement({ onAccept, accepted, inventoryItems }: LegalAgreementProps) {
  const [showInventory, setShowInventory] = useState(false);

  const groupedItems = inventoryItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Non-Binding Estimate Agreement</h3>
      
      <div className="prose prose-sm max-w-none mb-6">
        <div className="space-y-4 text-gray-600">
          <p>
            This document represents a non-binding estimate for moving services provided by Coastal Breeze Moving. 
            By accepting this agreement, you acknowledge and understand the following terms:
          </p>
          
          <ol className="list-decimal pl-4 space-y-2">
            <li>
              The estimate provided is based on the information you have supplied regarding your move and inventory.
            </li>
            <li>
              Final charges will be calculated based on actual services performed, time spent, and materials used.
            </li>
            <li>
              Additional fees may apply for:
              <ul className="list-disc pl-4 mt-2">
                <li>Items not included in the original inventory</li>
                <li>Additional packing materials required</li>
                <li>Difficult access conditions</li>
                <li>Extended waiting times</li>
                <li>Additional labor or equipment needed</li>
              </ul>
            </li>
            <li>
              A final binding price will be provided after an in-person or virtual assessment of your items and locations.
            </li>
            <li>
              Your credit card information is collected for verification purposes only and will not be charged without your explicit consent.
            </li>
            <li>
              You have the right to cancel or modify your move up to 48 hours before the scheduled date without penalty.
            </li>
          </ol>

          {/* Inventory Section */}
          <div className="mt-6 border-t pt-4">
            <button
              type="button"
              onClick={() => setShowInventory(!showInventory)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Icons.Package className="w-4 h-4" />
              <span>
                {showInventory ? 'Hide Inventory List' : 'View Inventory List'}
              </span>
              <Icons.ChevronDown 
                className={`w-4 h-4 transform transition-transform ${
                  showInventory ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showInventory && (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-500 italic">
                  The following inventory has been agreed upon for this estimate. 
                  Additional items may affect the final price.
                </p>

                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2 capitalize">
                      {category}
                    </h4>
                    <ul className="space-y-2">
                      {items.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span className="flex items-center">
                            {item.name}
                            {item.bedSize && (
                              <span className="ml-2 text-gray-500">
                                ({item.bedSize})
                              </span>
                            )}
                            {item.isFragile && (
                              <Icons.AlertTriangle className="w-4 h-4 text-amber-500 ml-2" />
                            )}
                            {item.specialHandling && (
                              <Icons.Shield className="w-4 h-4 text-blue-500 ml-2" />
                            )}
                          </span>
                          <span className="text-gray-600">
                            Qty: {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icons.Info className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">
                        Need to Update Your Inventory?
                      </h4>
                      <p className="text-sm text-blue-700">
                        Contact our customer service team to modify your inventory list. 
                        Changes to the inventory may affect the final price.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="font-medium mt-6">
            This estimate is valid for 30 days from the date of issue.
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="agreement"
          checked={accepted}
          onChange={(e) => onAccept(e.target.checked)}
          className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="agreement" className="text-sm text-gray-600">
          I have read and agree to the terms of this non-binding estimate. I understand that the final price may vary based on actual services performed and any changes to the inventory list.
        </label>
      </div>
    </div>
  );
}