import React from 'react';
import type { ItemSize } from '../../../types/inventory';
import { sizes } from '../../../utils/inventory-constants';

interface ItemPropertiesProps {
  size: ItemSize;
  onSizeChange: (size: ItemSize) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function ItemProperties({
  size,
  onSizeChange,
  quantity,
  onQuantityChange,
}: ItemPropertiesProps) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newQuantity = value === '' ? 1 : Math.max(1, parseInt(value) || 1);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
          Size
        </label>
        <select
          id="size"
          value={size}
          onChange={(e) => onSizeChange(e.target.value as ItemSize)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {sizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );
}