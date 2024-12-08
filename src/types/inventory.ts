export type ItemSize = 'small' | 'medium' | 'large';
export type ItemCategory = 'furniture' | 'electronics' | 'appliances' | 'boxes' | 'specialty';
export type BedSize = 'twin' | 'full' | 'queen' | 'king';

export interface ItemDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'in' | 'cm';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  size: ItemSize;
  quantity: number;
  isFragile: boolean;
  requiresDisassembly: boolean;
  dimensions?: ItemDimensions;
  specialHandling: boolean;
  estimatedValue?: number;
  notes?: string;
  bedSize?: BedSize;
}

export interface InventoryStats {
  totalItems: number;
  itemsByCategory: Record<ItemCategory, number>;
  itemsBySize: Record<ItemSize, number>;
  fragileCount: number;
  specialHandlingCount: number;
  disassemblyCount: number;
}

export interface MovingConstraints {
  doorwayWidth: number;
  hasElevator: boolean;
  maxStairwayWidth: number;
  unit: 'in' | 'cm';
}