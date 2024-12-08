export interface Profile {
  id: string;
  created_at: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface Move {
  id: string;
  created_at: string;
  user_id: string;
  origin_address: string;
  destination_address: string;
  move_date: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed';
  estimated_cost: number;
  actual_cost?: number;
}

export interface Inventory {
  id: string;
  move_id: string;
  created_at: string;
  items: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  special_handling: boolean;
  notes?: string;
}