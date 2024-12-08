import React from 'react';
import { Icons } from '../../utils/icons';
import { sendEmail } from '../../utils/email';
import type { InventoryItem } from '../../types/inventory';

interface InventoryLimitExceededProps {
  inventoryItems: InventoryItem[];
  onClose: () => void;
}

export function InventoryLimitExceeded({ inventoryItems, onClose }: InventoryLimitExceededProps) {
  const handleContactRequest = async () => {
    await sendEmail({
      subject: 'Large Inventory Move Request',
      message: `New large inventory move request with ${inventoryItems.length} items.`,
      name: 'System',
      email: 'system@coastalbreeze.com',
      phone: '',
    });
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
          <Icons.AlertTriangle className="w-12 h-12 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Custom Quote Required
        </h2>
        <p className="text-gray-600">
          Based on your inventory size, we'll need to create a custom quote for your move.
          Our team will contact you to discuss your specific needs and provide a detailed estimate.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-blue-900 mb-4">Why a Custom Quote?</h3>
        <ul className="space-y-3 text-blue-800">
          <li className="flex items-start">
            <Icons.Check className="w-5 h-5 text-blue-600 mr-2 mt-1" />
            <span>Specialized equipment requirements</span>
          </li>
          <li className="flex items-start">
            <Icons.Check className="w-5 h-5 text-blue-600 mr-2 mt-1" />
            <span>Additional crew members needed</span>
          </li>
          <li className="flex items-start">
            <Icons.Check className="w-5 h-5 text-blue-600 mr-2 mt-1" />
            <span>Custom packing solutions</span>
          </li>
          <li className="flex items-start">
            <Icons.Check className="w-5 h-5 text-blue-600 mr-2 mt-1" />
            <span>Detailed logistics planning</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleContactRequest}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Request Custom Quote
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
        >
          Modify Inventory
        </button>
      </div>
    </div>
  );
}