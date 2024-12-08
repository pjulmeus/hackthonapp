import React from 'react';
import { Icons } from '../../../utils/icons';
import { motion } from 'framer-motion';

interface InventoryMethodSelectorProps {
  onMethodSelect: (method: 'manual' | 'ar' | 'vr') => void;
}

export function InventoryMethodSelector({ onMethodSelect }: InventoryMethodSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Choose Your Inventory Method</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMethodSelect('manual')}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex flex-col items-center text-center">
            <Icons.Package className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Manual Entry</h3>
            <p className="text-sm text-gray-600">
              Manually add items to your inventory list with our easy-to-use form
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMethodSelect('ar')}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative"
        >
          <div className="flex flex-col items-center text-center">
            <Icons.Smartphone className="w-12 h-12 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AR Scanner</h3>
            <p className="text-sm text-gray-600">
              Use your phone's camera to scan and measure items in augmented reality
            </p>
            <span className="mt-2 text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full">
              Coming Soon
            </span>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMethodSelect('vr')}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative"
        >
          <div className="flex flex-col items-center text-center">
            <Icons.Glasses className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">VR Walkthrough</h3>
            <p className="text-sm text-gray-600">
              Take a virtual walk through your space and mark items in VR
            </p>
            <span className="mt-2 text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              Coming Soon
            </span>
          </div>
        </motion.button>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icons.Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">AR/VR Features Coming Soon</h4>
            <p className="text-sm text-blue-700">
              We're working on advanced AR and VR features to make inventory collection even easier. 
              For now, please use our manual entry system for the most accurate results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}