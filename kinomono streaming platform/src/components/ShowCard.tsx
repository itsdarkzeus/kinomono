import React, { useState } from 'react';
import { Play, Plus, Info, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Show } from '../lib/supabase';
import { useMyListStore } from '../store/myListStore';
import Button from './ui/Button';

interface ShowCardProps {
  show: Show;
  onInfoClick: () => void;
}

const ShowCard = ({ show, onInfoClick }: ShowCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToList, removeFromList, isInList } = useMyListStore();
  const inList = isInList(show.id);

  const handleMyList = () => {
    if (inList) {
      removeFromList(show.id);
    } else {
      addToList(show);
    }
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video overflow-hidden rounded-md">
        <img
          src={show.image}
          alt={show.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      {show.progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-netflix-gray/30">
          <div
            className="h-full bg-netflix-red transition-all"
            style={{ width: `${show.progress}%` }}
          />
        </div>
      )}

      <div className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Link to={`/show/${show.id}`}>
            <Button size="sm" variant="secondary" icon={<Play className="w-4 h-4" />}>
              Play
            </Button>
          </Link>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleMyList}
            icon={inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          >
            {inList ? 'Remove' : 'My List'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto"
            onClick={onInfoClick}
            icon={<Info className="w-4 h-4" />}
          />
        </div>
        <h3 className="font-medium text-lg mb-1">{show.title}</h3>
        <p className="text-sm text-netflix-light line-clamp-2">{show.description}</p>
      </div>
    </div>
  );
};

export default ShowCard;