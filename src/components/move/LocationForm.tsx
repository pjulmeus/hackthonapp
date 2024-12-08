import React from 'react';
import type { Address } from '../../types';
import { AddressForm } from './AddressForm';

interface LocationFormProps {
  address: Address;
  onAddressChange: (address: Address) => void;
  onRemove?: () => void;
  label: string;
}

export function LocationForm({
  address,
  onAddressChange,
  onRemove,
  label,
}: LocationFormProps) {
  return (
    <div className="space-y-4">
      <AddressForm
        address={address}
        onChange={onAddressChange}
        onRemove={onRemove}
        label={label}
      />
    </div>
  );
}