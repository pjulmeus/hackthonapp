import React, { useState } from 'react';
import { Icons } from '../../utils/icons';
import type { Room } from '../../types';
import { commonItems } from '../../utils/helpers';

interface RoomCardProps {
  room: Room;
  onAddItem: (roomId: string, name: string, quantity: number, specialHandling: boolean) => void;
  onRemoveItem: (roomId: string, itemId: string) => void;
  onUpdateQuantity: (roomId: string, itemId: string, quantity: number) => void;
}

export function RoomCard({ room, onAddItem, onRemoveItem, onUpdateQuantity }: RoomCardProps) {
  const [newItemName, setNewItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [specialHandling, setSpecialHandling] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddItem(room.id, newItemName, quantity, specialHandling);
      setNewItemName('');
      setQuantity(1);
      setSpecialHandling(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{room.name}</h3>
      
      <div className="mb-6">
        <form onSubmit={handleAddItem} className="flex flex-wrap gap-4">
          <div className="flex-1">
            <select
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select an item...</option>
              {commonItems[room.name as keyof typeof commonItems]?.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
              <option value="custom">Custom Item...</option>
            </select>
          </div>
          
          {newItemName === 'custom' && (
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter item name"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </div>
          )}

          <div className="w-24">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`special-${room.id}`}
              checked={specialHandling}
              onChange={(e) => setSpecialHandling(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <label htmlFor={`special-${room.id}`} className="ml-2 text-sm text-gray-600 flex items-center">
              <Icons.Wrench className="w-4 h-4 mr-1 text-blue-600" />
              Special Handling
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Icons.Plus size={16} className="mr-2" />
            Add
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {room.items.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex-1">
              <span className="font-medium">{item.name}</span>
              {item.specialHandling && (
                <span className="ml-2 text-sm text-yellow-600 flex items-center">
                  <Icons.Wrench className="w-4 h-4 mr-1" />
                  Special Handling
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(room.id, item.id, Number(e.target.value))}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              
              <button
                onClick={() => onRemoveItem(room.id, item.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Icons.Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}