import React, { useState } from 'react';
import type { InventoryItem } from '../../types/inventory';
import { ItemForm } from './ItemForm';
import { InventoryList } from './InventoryList';
import { InventoryStats } from './InventoryStats';
import { InventoryActions } from './actions/InventoryActions';
import { InventoryMethodSelector } from './actions/InventoryMethodSelector';
import { InventoryLimitExceeded } from './InventoryLimitExceeded';
import { calculateInventoryStats } from '../../utils/inventory-constants';
import { isLargeInventory } from '../../utils/inventory/comparison';
import { generateId } from '../../utils/helpers';

interface InventoryManagerProps {
  onComplete: (items: InventoryItem[]) => void;
  moveSize?: string;
}

export function InventoryManager({ onComplete, moveSize = '1-bedroom' }: InventoryManagerProps) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<'manual' | 'ar' | 'vr' | null>(null);
  const [showLimitExceeded, setShowLimitExceeded] = useState(false);

  const checkInventorySize = (itemsToCheck: InventoryItem[]) => {
    return isLargeInventory(itemsToCheck, moveSize as any);
  };

  const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
    const updatedItems = [...items, { ...newItem, id: generateId() }];
    
    if (checkInventorySize(updatedItems)) {
      setShowLimitExceeded(true);
    } else {
      setItems(updatedItems);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    
    if (checkInventorySize(updatedItems)) {
      setShowLimitExceeded(true);
    } else {
      setItems(updatedItems);
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMethodSelect = (method: 'manual' | 'ar' | 'vr') => {
    setSelectedMethod(method);
    if (method === 'ar' || method === 'vr') {
      setSelectedMethod('manual');
    }
  };

  const handleInventoryComplete = () => {
    if (checkInventorySize(items)) {
      setShowLimitExceeded(true);
    } else {
      onComplete(items);
    }
  };

  const stats = calculateInventoryStats(items);

  if (showLimitExceeded) {
    return (
      <InventoryLimitExceeded 
        inventoryItems={items}
        onClose={() => setShowLimitExceeded(false)}
      />
    );
  }

  if (!selectedMethod) {
    return <InventoryMethodSelector onMethodSelect={handleMethodSelect} />;
  }

  return (
    <div className="space-y-8">
      <ItemForm onSubmit={handleAddItem} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <InventoryStats stats={stats} />
          <div className="mt-8">
            <InventoryList
              items={items}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div className="mt-8">
            <InventoryActions items={items} onComplete={handleInventoryComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}