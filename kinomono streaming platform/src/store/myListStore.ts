import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Show } from '../lib/supabase';

interface MyListState {
  items: Show[];
  addToList: (show: Show) => void;
  removeFromList: (showId: number) => void;
  isInList: (showId: number) => boolean;
}

export const useMyListStore = create<MyListState>()(
  persist(
    (set, get) => ({
      items: [],
      addToList: (show) => {
        const { items } = get();
        if (!items.some(item => item.id === show.id)) {
          set({ items: [...items, show] });
        }
      },
      removeFromList: (showId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== showId) });
      },
      isInList: (showId) => {
        return get().items.some(item => item.id === showId);
      }
    }),
    {
      name: 'my-list-storage'
    }
  )
);