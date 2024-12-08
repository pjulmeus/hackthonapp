import React, { useState } from 'react';
import { Icons } from '../../utils/icons';
import type { MoveDetails, Address } from '../../types';
import { InitialMoveDetails } from './InitialMoveDetails';
import { LocationForm } from './LocationForm';

const emptyAddress: Address = {
  street: '',
  city: '',
  state: '',
  zipCode: '',
  size: 'studio',
  stairs: {
    hasStairs: false,
    flightCount: 0,
  },
};

interface MoveFormProps {
  onSubmit: (details: MoveDetails) => void;
}

export function MoveForm({ onSubmit }: MoveFormProps) {
  const [moveDetails, setMoveDetails] = useState<MoveDetails>({
    moveDate: '',
    preferredTime: '',
    requiresCOI: false,
    origin: emptyAddress,
    destinations: [emptyAddress],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(moveDetails);
  };

  const addDestination = () => {
    setMoveDetails(prev => ({
      ...prev,
      destinations: [...prev.destinations, emptyAddress],
    }));
  };

  const removeDestination = (index: number) => {
    setMoveDetails(prev => ({
      ...prev,
      destinations: prev.destinations.filter((_, i) => i !== index),
    }));
  };

  const updateDestination = (index: number, address: Address) => {
    setMoveDetails(prev => ({
      ...prev,
      destinations: prev.destinations.map((dest, i) => 
        i === index ? address : dest
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InitialMoveDetails
        moveDate={moveDetails.moveDate}
        preferredTime={moveDetails.preferredTime}
        requiresCOI={moveDetails.requiresCOI}
        onMoveDataChange={(date) => setMoveDetails(prev => ({ ...prev, moveDate: date }))}
        onTimeChange={(time) => setMoveDetails(prev => ({ ...prev, preferredTime: time }))}
        onCOIChange={(requiresCOI) => setMoveDetails(prev => ({ ...prev, requiresCOI }))}
      />

      <LocationForm
        address={moveDetails.origin}
        onAddressChange={(address) => setMoveDetails(prev => ({ ...prev, origin: address }))}
        label="Moving From"
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Moving To</h3>
          <button
            type="button"
            onClick={addDestination}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Icons.Plus size={16} className="mr-2" />
            Add Destination
          </button>
        </div>

        {moveDetails.destinations.map((dest, index) => (
          <LocationForm
            key={index}
            address={dest}
            onAddressChange={(address) => updateDestination(index, address)}
            onRemove={moveDetails.destinations.length > 1 ? () => removeDestination(index) : undefined}
            label={`Destination ${index + 1}`}
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Continue to Inventory
      </button>
    </form>
  );
}