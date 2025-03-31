import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example';

export const supabase = createClient(supabaseUrl, supabaseKey);

// For demo purposes, we'll simulate auth
export const demoAuth = {
  signIn: async (email: string, password: string) => {
    if (email === 'demo@kinomono.com' && password === 'demo123') {
      return {
        data: {
          user: {
            id: '1',
            email: 'demo@kinomono.com',
            user_metadata: {
              avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop'
            }
          }
        },
        error: null
      };
    }
    throw new Error('Invalid email or password');
  },
  signUp: async (email: string, password: string) => {
    throw new Error('Sign up is disabled in demo mode. Please use the demo account.');
  },
  signOut: async () => {
    return { error: null };
  }
};

export type Show = {
  id: number;
  title: string;
  description: string;
  image: string;
  type: 'movie' | 'tv' | 'anime';
  progress?: number;
  episodes?: Episode[];
};

export type Episode = {
  id: number;
  show_id: number;
  title: string;
  episode_number: number;
  season_number: number;
  duration: number;
  thumbnail: string;
};