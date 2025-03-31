import React from 'react';
import ContentGrid from '../components/ContentGrid';
import { Show } from '../lib/supabase';
import { Sparkles, Flame, History } from 'lucide-react';

const animeShows: Show[] = [
  {
    id: 3,
    title: "Spirit Blade",
    description: "A legendary sword that holds the power to shape destiny...",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=450&fit=crop",
    type: "anime",
    progress: 0
  },
  {
    id: 4,
    title: "Neo Tokyo Dreams",
    description: "In the year 2089, dreams become reality...",
    image: "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&h=450&fit=crop",
    type: "anime",
    progress: 75
  },
  {
    id: 9,
    title: "Sakura Storm",
    description: "A beautiful tale of friendship and courage...",
    image: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=800&h=450&fit=crop",
    type: "anime",
    progress: 0
  },
  {
    id: 10,
    title: "Cyber Revolution",
    description: "The future of humanity hangs in the balance...",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop",
    type: "anime",
    progress: 0
  }
];

const Anime = () => {
  return (
    <div className="pt-32 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] mb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1580584126903-c17d41830450?w=1920&h=1080&fit=crop"
            alt="Anime Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/20" />
        </div>
        
        <div className="absolute bottom-[20%] left-4 md:left-[4%] max-w-xl z-10">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={32} className="text-netflix-red" />
            <h1 className="text-4xl md:text-5xl font-bold">Anime</h1>
          </div>
          <p className="text-lg text-netflix-light">
            Explore the best of Japanese animation, from classic series to the latest releases.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-[4%] pb-20 space-y-16">
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Flame className="text-netflix-red" />
            <h2 className="text-2xl font-medium">Trending Anime</h2>
          </div>
          <ContentGrid items={animeShows} title="" />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-8">
            <History className="text-netflix-red" />
            <h2 className="text-2xl font-medium">Classic Anime</h2>
          </div>
          <ContentGrid items={animeShows} title="" />
        </section>
      </div>
    </div>
  );
};

export default Anime;