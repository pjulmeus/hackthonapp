import { useState } from 'react';
import type { Room, InventoryItem } from '../types';
import { generateId } from '../utils/helpers';

export function useInventory() {
  const [rooms, setRooms] = useState<Room[]>([]);

  const addRoom = (name: string) => {
    setRooms(prev => [...prev, { id: generateId(), name, items: [] }]);
  };

  const addItem = (roomId: string, item: Omit<InventoryItem, 'id'>) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          items: [...room.items, { ...item, id: generateId() }]
        };
      }
      return room;
    }));
  };

  const removeItem = (roomId: string, itemId: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          items: room.items.filter(item => item.id !== itemId)
        };
      }
      return room;
    }));
  };

  const updateItemQuantity = (roomId: string, itemId: string, quantity: number) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          items: room.items.map(item => 
            item.id === itemId ? { ...item, quantity } : item
          )
        };
      }
      return room;
    }));
  };

  return {
    rooms,
    addRoom,
    addItem,
    removeItem,
    updateItemQuantity
  };
}