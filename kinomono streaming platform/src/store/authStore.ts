import { create } from 'zustand';
import { demoAuth } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    avatar_url?: string;
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initAuth: () => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser), loading: false });
    } else {
      set({ loading: false });
    }
  },
  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await demoAuth.signIn(email, password);
      if (error) throw error;
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      set({ user: data.user });
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (email, password) => {
    set({ loading: true });
    try {
      const { error } = await demoAuth.signUp(email, password);
      if (error) throw error;
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      const { error } = await demoAuth.signOut();
      if (error) throw error;
      localStorage.removeItem('auth_user');
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
  setUser: (user) => set({ user, loading: false }),
}));