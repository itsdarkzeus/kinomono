import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Show, Episode } from '../lib/supabase';

const episodes: Episode[] = [
  {
    id: 1,
    show_id: 1,
    title: "The Beginning",
    episode_number: 1,
    season_number: 1,
    duration: 45,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop"
  },
  {
    id: 2,
    show_id: 1,
    title: "Digital Dreams",
    episode_number: 2,
    season_number: 1,
    duration: 42,
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=225&fit=crop"
  },
  {
    id: 3,
    show_id: 1,
    title: "Virtual Reality",
    episode_number: 3,
    season_number: 1,
    duration: 48,
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop"
  },
  {
    id: 4,
    show_id: 1,
    title: "The Matrix",
    episode_number: 4,
    season_number: 1,
    duration: 45,
    thumbnail: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=400&h=225&fit=crop"
  }
];

const ShowDetails = () => {
  const { id } = useParams();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState(false);
  
  const show: Show = {
    id: 1,
    title: "Cyber Nexus",
    description: "In a world where reality and virtual existence merge, follow the journey of elite hackers as they uncover a conspiracy that threatens both worlds. As the lines between real and virtual blur, they must navigate through dangerous territories while questioning their own existence.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop",
    type: "tv",
    progress: 45,
    episodes: episodes
  };

  const seasons = [1, 2, 3];

  return (
    <div className="min-h-screen">
      <div className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img src={show.image} alt={show.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/20" />
        </div>
        
        <div className="absolute bottom-[15%] left-4 md:left-[4%] max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{show.title}</h1>
          <p className="text-base md:text-lg text-netflix-light mb-8 line-clamp-3 md:line-clamp-none">
            {show.description}
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center px-6 md:px-8 py-2 md:py-3 bg-white hover:bg-white/90 text-black rounded font-medium transition">
              <Play className="mr-2 fill-black" size={24} />
              Play
            </button>
            <button className="flex items-center p-2 md:p-3 bg-white/30 hover:bg-white/20 rounded-full transition">
              <Plus size={24} />
            </button>
            <button className="flex items-center p-2 md:p-3 bg-white/30 hover:bg-white/20 rounded-full transition">
              <ThumbsUp size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-[4%] py-8 -mt-32 relative z-10">
        <div className="flex items-center gap-4 mb-6 sticky top-16">
          <h2 className="text-xl md:text-2xl font-medium">Episodes</h2>
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-netflix-dark hover:bg-netflix-gray/20 border border-netflix-gray/40 rounded-md text-sm transition-colors"
              onClick={() => setIsSeasonMenuOpen(!isSeasonMenuOpen)}
            >
              Season {selectedSeason}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSeasonMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSeasonMenuOpen && (
              <div className="absolute top-full mt-1 w-full bg-netflix-dark border border-netflix-gray/40 rounded-md shadow-lg animate-fadeIn">
                {seasons.map((season) => (
                  <button
                    key={season}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-netflix-gray/20 transition-colors"
                    onClick={() => {
                      setSelectedSeason(season);
                      setIsSeasonMenuOpen(false);
                    }}
                  >
                    Season {season}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {show.episodes?.map((episode) => (
            <div key={episode.id} className="flex flex-col md:flex-row gap-4 bg-netflix-dark hover:bg-netflix-gray/20 transition rounded-md overflow-hidden group cursor-pointer">
              <div className="relative md:w-48 shrink-0">
                <img src={episode.thumbnail} alt={episode.title} className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                  <Play className="w-12 h-12 fill-white text-white" />
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-medium">
                    {episode.season_number}x{episode.episode_number.toString().padStart(2, '0')} - {episode.title}
                  </h3>
                  <span className="text-sm text-netflix-gray shrink-0">{episode.duration}m</span>
                </div>
                <p className="mt-2 text-sm text-netflix-gray line-clamp-2 md:line-clamp-none">
                  Watch the journey unfold as our heroes face their first challenge in the digital realm.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;