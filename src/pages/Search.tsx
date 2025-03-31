import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import ContentGrid from '../components/ContentGrid';
import { Show } from '../lib/supabase';

const allContent: Show[] = [
  {
    id: 1,
    title: "Cyber Nexus",
    description: "In a world where reality and virtual existence merge...",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    type: "tv",
    progress: 45
  },
  {
    id: 4,
    title: "Neo Tokyo Dreams",
    description: "In the year 2089, dreams become reality...",
    image: "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&h=450&fit=crop",
    type: "anime",
    progress: 75
  }
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Show[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for movies, shows, or anime..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600"
          />
        </div>
      </div>
      
      {query && (
        <div>
          {results.length > 0 ? (
            <ContentGrid title="Search Results" items={results} />
          ) : (
            <p className="text-center text-gray-400">No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;