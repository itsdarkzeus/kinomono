import React from 'react';
import ContentGrid from '../components/ContentGrid';
import { Show } from '../lib/supabase';
import { Tv, Sparkles, Trophy } from 'lucide-react';

const shows: Show[] = [
  {
    id: 1,
    title: "Cyber Nexus",
    description: "In a world where reality and virtual existence merge...",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    type: "tv",
    progress: 45
  },
  {
    id: 2,
    title: "Urban Tales",
    description: "Stories from the city that never sleeps...",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=450&fit=crop",
    type: "tv",
    progress: 0
  },
  {
    id: 3,
    title: "Digital Horizons",
    description: "A journey through digital realms...",
    image: "https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=800&h=450&fit=crop",
    type: "tv",
    progress: 65
  },
  {
    id: 4,
    title: "Neon Knights",
    description: "In the neon-lit streets of Neo Tokyo...",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=450&fit=crop",
    type: "tv",
    progress: 0
  }
];

const Shows = () => {
  return (
    <div className="pt-32 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] mb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop"
            alt="TV Shows Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/20" />
        </div>
        
        <div className="absolute bottom-[20%] left-4 md:left-[4%] max-w-xl z-10">
          <div className="flex items-center gap-3 mb-6">
            <Tv size={32} className="text-netflix-red" />
            <h1 className="text-4xl md:text-5xl font-bold">TV Shows</h1>
          </div>
          <p className="text-lg text-netflix-light">
            Discover our collection of exclusive series, from gripping dramas to hilarious comedies.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-[4%] pb-20 space-y-16">
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="text-netflix-red" />
            <h2 className="text-2xl font-medium">Popular Shows</h2>
          </div>
          <ContentGrid items={shows} title="" />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-8">
            <Trophy className="text-netflix-red" />
            <h2 className="text-2xl font-medium">Award-Winning Series</h2>
          </div>
          <ContentGrid items={shows} title="" />
        </section>
      </div>
    </div>
  );
};

export default Shows;