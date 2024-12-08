import { supabase } from '../supabase';
import type { Profile, Move, Inventory } from '../../types/database';

export async function getProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

export async function updateProfile(profile: Partial<Profile>): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id);

  if (error) {
    console.error('Error updating profile:', error);
    return false;
  }

  return true;
}

export async function createMove(move: Omit<Move, 'id' | 'created_at'>): Promise<Move | null> {
  const { data, error } = await supabase
    .from('moves')
    .insert(move)
    .select()
    .single();

  if (error) {
    console.error('Error creating move:', error);
    return null;
  }

  return data;
}

export async function getMoves(): Promise<Move[]> {
  const { data, error } = await supabase
    .from('moves')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching moves:', error);
    return [];
  }

  return data;
}

export async function createInventory(inventory: Omit<Inventory, 'id' | 'created_at'>): Promise<Inventory | null> {
  const { data, error } = await supabase
    .from('inventories')
    .insert(inventory)
    .select()
    .single();

  if (error) {
    console.error('Error creating inventory:', error);
    return null;
  }

  return data;
}

export async function getInventory(moveId: string): Promise<Inventory | null> {
  const { data, error } = await supabase
    .from('inventories')
    .select('*')
    .eq('move_id', moveId)
    .single();

  if (error) {
    console.error('Error fetching inventory:', error);
    return null;
  }

  return data;
}