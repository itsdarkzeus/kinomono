import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ShowCard from './ShowCard';
import Modal from './ui/Modal';
import Button from './ui/Button';
import ScrollAnimation from './ScrollAnimation';
import { Show } from '../lib/supabase';
import { useMyListStore } from '../store/myListStore';

interface ContentGridProps {
  title: string;
  items: Show[];
}

const ContentGrid = ({ title, items }: ContentGridProps) => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const { isInList } = useMyListStore();

  return (
    <ScrollAnimation animation="fade-up" className="mb-16 group/section">
      {title && (
        <ScrollAnimation animation="fade-left" className="text-2xl font-medium mb-6 text-netflix-light px-4 md:px-[4%]">
          <h2>{title}</h2>
        </ScrollAnimation>
      )}
      
      <div className="relative group/slider">
        <ScrollAnimation animation="stagger" className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-[4%]">
          {items.map((show) => (
            <div key={show.id} className="flex-none w-[300px]">
              <ShowCard
                show={show}
                onInfoClick={() => setSelectedShow(show)}
              />
            </div>
          ))}
        </ScrollAnimation>

        <button className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 opacity-0 group-hover/slider:opacity-100 transition-opacity flex items-center justify-center">
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 opacity-0 group-hover/slider:opacity-100 transition-opacity flex items-center justify-center">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <Modal
        isOpen={!!selectedShow}
        onClose={() => setSelectedShow(null)}
        title={selectedShow?.title || ''}
        size="lg"
      >
        {selectedShow && (
          <ScrollAnimation animation="scale" className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={selectedShow.image}
                alt={selectedShow.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-netflix-light text-lg">{selectedShow.description}</p>
            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<Play className="w-5 h-5" />}
              >
                Play Now
              </Button>
              <Button
                variant="outline"
                size="lg"
              >
                {isInList(selectedShow.id) ? 'Remove from List' : 'Add to List'}
              </Button>
            </div>
          </ScrollAnimation>
        )}
      </Modal>
    </ScrollAnimation>
  );
};

export default ContentGrid;