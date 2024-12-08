import React from 'react';
import { Icons } from '../../utils/icons';
import type { ItemCategory, ItemSize, InventoryItem, BedSize } from '../../types/inventory';
import { CategorySelect } from './form/CategorySelect';
import { ItemNameInput } from './form/ItemNameInput';
import { ItemProperties } from './form/ItemProperties';
import { BedSizeSelect } from './form/BedSizeSelect';
import { isFragileItem } from '../../utils/inventory/fragile-items';

interface ItemFormProps {
  onSubmit: (item: Omit<InventoryItem, 'id'>) => void;
}

export function ItemForm({ onSubmit }: ItemFormProps) {
  const [item, setItem] = React.useState<Omit<InventoryItem, 'id'>>({
    name: '',
    category: 'furniture',
    size: 'medium',
    quantity: 1,
    isFragile: false,
    requiresDisassembly: false,
    specialHandling: false,
    bedSize: 'queen',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submittedItem = {
      ...item,
      name: item.category === 'boxes' ? 'Box' : item.name,
      // Automatically mark item as fragile if it's in the fragile items list
      isFragile: item.isFragile || isFragileItem(item.name),
    };
    onSubmit(submittedItem);
    setItem({
      name: '',
      category: 'furniture',
      size: 'medium',
      quantity: 1,
      isFragile: false,
      requiresDisassembly: false,
      specialHandling: false,
      bedSize: 'queen',
    });
  };

  const handleNameChange = (name: string) => {
    setItem(prev => ({
      ...prev,
      name,
      // Automatically check fragile when selecting a fragile item
      isFragile: isFragileItem(name) ? true : prev.isFragile
    }));
  };

  const isBed = item.name.toLowerCase() === 'bed';

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4 border-t-4 border-teal-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategorySelect
          value={item.category}
          onChange={(category) => setItem({ ...item, category, name: '' })}
        />

        {item.category !== 'boxes' && (
          <ItemNameInput
            category={item.category}
            value={item.name}
            onChange={handleNameChange}
          />
        )}
      </div>

      {isBed ? (
        <BedSizeSelect
          value={item.bedSize || 'queen'}
          onChange={(bedSize) => setItem({ ...item, bedSize })}
        />
      ) : (
        <ItemProperties
          size={item.size}
          onSizeChange={(size) => setItem({ ...item, size })}
          quantity={item.quantity}
          onQuantityChange={(quantity) => setItem({ ...item, quantity })}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFragile"
            checked={item.isFragile || isFragileItem(item.name)}
            onChange={(e) => setItem({ ...item, isFragile: e.target.checked })}
            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            disabled={isFragileItem(item.name)} // Disable checkbox if item is always fragile
          />
          <label htmlFor="isFragile" className="ml-2 text-sm text-gray-700 flex items-center">
            <Icons.Package className="w-4 h-4 mr-1 text-teal-600" />
            Fragile Item
          </label>
        </div>

        {item.category !== 'boxes' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="requiresDisassembly"
              checked={item.requiresDisassembly}
              onChange={(e) => setItem({ ...item, requiresDisassembly: e.target.checked })}
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <label htmlFor="requiresDisassembly" className="ml-2 text-sm text-gray-700 flex items-center">
              <Icons.Wrench className="w-4 h-4 mr-1 text-blue-600" />
              Requires Disassembly
            </label>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="specialHandling"
            checked={item.specialHandling}
            onChange={(e) => setItem({ ...item, specialHandling: e.target.checked })}
            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <label htmlFor="specialHandling" className="ml-2 text-sm text-gray-700 flex items-center">
            <Icons.Shield className="w-4 h-4 mr-1 text-indigo-600" />
            Special Handling
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add Item
      </button>
    </form>
  );
}