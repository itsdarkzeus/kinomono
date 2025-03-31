import React from 'react';
import ContentGrid from '../components/ContentGrid';
import { Show } from '../lib/supabase';
import { Film, Star, Clock, Zap, Award } from 'lucide-react';

const movies: Show[] = [
  {
    id: 5,
    title: "Digital Horizons",
    description: "A journey through digital realms...",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  },
  {
    id: 6,
    title: "The Last Stand",
    description: "When hope is all that remains...",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop",
    type: "movie",
    progress: 30
  },
  {
    id: 7,
    title: "Quantum Dreams",
    description: "Reality bends as quantum physics meets consciousness...",
    image: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  },
  {
    id: 8,
    title: "Desert Storm",
    description: "A tale of survival in the harshest conditions...",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=450&fit=crop",
    type: "movie",
    progress: 30
  },
  {
    id: 9,
    title: "Neon City",
    description: "In a world of perpetual night...",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  },
  {
    id: 10,
    title: "Mind's Eye",
    description: "The power of the mind knows no bounds...",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  }
];

const blockbusters = movies.slice(0, 6);
const newReleases = [...movies].reverse().slice(0, 6);
const awardWinning = movies.slice(2, 8);
const trending = movies.slice(1, 7);

const Movies = () => {
  return (
    <div className="pt-32 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] mb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop"
            alt="Movies Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/20" />
        </div>
        
        <div className="absolute bottom-[20%] left-4 md:left-[4%] max-w-xl z-10">
          <div className="flex items-center gap-3 mb-6">
            <Film size={32} className="text-netflix-red" />
            <h1 className="text-4xl md:text-5xl font-bold">Movies</h1>
          </div>
          <p className="text-lg text-netflix-light">
            Discover our collection of exclusive movies, from blockbuster hits to indie gems.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-[4%] pb-20 space-y-16">
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Star className="text-netflix-red" />
            <h2 className="text-2xl font-medium">Blockbuster Movies</h2>
          </div>
          <ContentGrid items={blockbusters} title="" />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-8">
            <Zap className="text-netflix-red" />
            <h2 className="text-2xl font-medium">Trending Now</h2>
          </div>
          <ContentGrid items={trending} title="" />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-8">
            <Clock className="text-netflix-red" />
            <h2 className="text-2xl font-medium">New Releases</h2>
          </div>
          <ContentGrid items={newReleases} title="" />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-8">
            <Award className="text-netflix-red" />
            <h2 className="text-2xl font-medium">Award-Winning Films</h2>
          </div>
          <ContentGrid items={awardWinning} title="" />
        </section>
      </div>
    </div>
  );
};

export default Movies;