import React from 'react';
import Hero from '../components/Hero';
import ContentGrid from '../components/ContentGrid';
import { Show } from '../lib/supabase';

const trendingShows: Show[] = [
  {
    id: 1,
    title: "Cyber Nexus",
    description: "In a world where reality and virtual existence merge...",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    type: "tv",
    progress: 0
  },
  {
    id: 2,
    title: "Digital Horizons",
    description: "A journey through digital realms...",
    image: "https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=800&h=450&fit=crop",
    type: "tv",
    progress: 65
  },
  {
    id: 3,
    title: "Neon Knights",
    description: "In the neon-lit streets of Neo Tokyo...",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=450&fit=crop",
    type: "tv",
    progress: 0
  },
  {
    id: 4,
    title: "Quantum Dreams",
    description: "Reality bends as quantum physics meets consciousness...",
    image: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  },
  {
    id: 5,
    title: "Desert Storm",
    description: "A tale of survival in the harshest conditions...",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=450&fit=crop",
    type: "movie",
    progress: 30
  }
];

const continueWatching: Show[] = [
  {
    id: 6,
    title: "Digital Horizons",
    description: "A journey through digital realms...",
    image: "https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=800&h=450&fit=crop",
    type: "tv",
    progress: 65
  },
  {
    id: 7,
    title: "Desert Storm",
    description: "A tale of survival in the harshest conditions...",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=450&fit=crop",
    type: "movie",
    progress: 30
  }
];

const newReleases: Show[] = [
  {
    id: 8,
    title: "Cyber Revolution",
    description: "The future of humanity hangs in the balance...",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop",
    type: "tv",
    progress: 0
  },
  {
    id: 9,
    title: "Mind Games",
    description: "A psychological thriller that will keep you guessing...",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  },
  {
    id: 10,
    title: "Future World",
    description: "Experience the world of tomorrow...",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  }
];

const popularInJapan: Show[] = [
  {
    id: 11,
    title: "Spirit Blade",
    description: "A legendary sword that holds the power to shape destiny...",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=450&fit=crop",
    type: "anime",
    progress: 0
  },
  {
    id: 12,
    title: "Neo Tokyo Dreams",
    description: "In the year 2089, dreams become reality...",
    image: "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&h=450&fit=crop",
    type: "anime",
    progress: 75
  },
  {
    id: 13,
    title: "Sakura Storm",
    description: "A beautiful tale of friendship and courage...",
    image: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=800&h=450&fit=crop",
    type: "anime",
    progress: 0
  }
];

const sciFiPicks: Show[] = [
  {
    id: 14,
    title: "Space Frontier",
    description: "The final frontier awaits...",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  },
  {
    id: 15,
    title: "Cyber Revolution",
    description: "The future of humanity hangs in the balance...",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop",
    type: "tv",
    progress: 0
  },
  {
    id: 16,
    title: "AI Wars",
    description: "When artificial intelligence becomes self-aware...",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
    type: "movie",
    progress: 0
  }
];

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="pb-20 -mt-16 relative z-10"> {/* Changed from -mt-32 to -mt-16 */}
        <div className="pt-8"> {/* Added padding top */}
          <ContentGrid title="Continue Watching" items={continueWatching} />
        </div>
        <ContentGrid title="Trending Now" items={trendingShows} />
        <ContentGrid title="New Releases" items={newReleases} />
        <ContentGrid title="Popular in Japan" items={popularInJapan} />
        <ContentGrid title="Sci-Fi Picks" items={sciFiPicks} />
      </div>
    </div>
  );
};

export default Home;