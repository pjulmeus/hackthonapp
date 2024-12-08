import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import type { Profile, Move, Inventory } from '../types/database';

export function useSupabase() {
  const [user, setUser] = useState(supabase.auth.getUser());
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setProfile(profile);
      } else {
        setProfile(null);
      }
      setUser(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const createMove = async (moveData: Omit<Move, 'id' | 'created_at' | 'user_id'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('moves')
      .insert({
        ...moveData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating move:', error);
      return null;
    }

    return data;
  };

  const createInventory = async (moveId: string, items: Inventory['items']) => {
    const { data, error } = await supabase
      .from('inventories')
      .insert({
        move_id: moveId,
        items
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating inventory:', error);
      return null;
    }

    return data;
  };

  return {
    user,
    profile,
    loading,
    createMove,
    createInventory
  };
}