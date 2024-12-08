import React from 'react';
import type { Address } from '../../types';
import { StairsForm } from './StairsForm';
import { MoveSize } from './MoveSize';

interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
  onRemove?: () => void;
  label: string;
}

export function AddressForm({ address, onChange, onRemove, label }: AddressFormProps) {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{label}</h3>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            value={address.street}
            onChange={(e) => onChange({ ...address, street: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              value={address.city}
              onChange={(e) => onChange({ ...address, city: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              value={address.state}
              onChange={(e) => onChange({ ...address, state: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={address.zipCode}
            onChange={(e) => onChange({ ...address, zipCode: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="border-t pt-4">
          <MoveSize
            value={address.size}
            onChange={(size) => onChange({ ...address, size })}
          />
        </div>

        <div className="border-t pt-4">
          <StairsForm
            hasStairs={address.stairs.hasStairs}
            flightCount={address.stairs.flightCount}
            onChange={(stairs) => onChange({ ...address, stairs })}
          />
        </div>
      </div>
    </div>
  );
}