import React from 'react';
import type { Room } from '../../types';
import { RoomCard } from './RoomCard';

interface RoomListProps {
  rooms: Room[];
  onAddItem: (roomId: string, name: string, quantity: number, specialHandling: boolean) => void;
  onRemoveItem: (roomId: string, itemId: string) => void;
  onUpdateQuantity: (roomId: string, itemId: string, quantity: number) => void;
}

export function RoomList({ rooms, onAddItem, onRemoveItem, onUpdateQuantity }: RoomListProps) {
  return (
    <div className="space-y-6">
      {rooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
}