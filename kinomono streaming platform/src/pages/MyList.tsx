import React from 'react';
import ContentGrid from '../components/ContentGrid';
import { useMyListStore } from '../store/myListStore';
import { List, BookmarkX } from 'lucide-react';

const MyList = () => {
  const { items } = useMyListStore();

  return (
    <div className="pt-32 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] mb-16">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-netflix-black via-netflix-dark to-netflix-black" />
        </div>
        
        <div className="absolute bottom-[20%] left-4 md:left-[4%] max-w-xl z-10">
          <div className="flex items-center gap-3 mb-6">
            <List size={32} className="text-netflix-red" />
            <h1 className="text-4xl md:text-5xl font-bold">My List</h1>
          </div>
          <p className="text-lg text-netflix-light">
            Your personal collection of favorite shows and movies.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-[4%] pb-20">
        {items.length > 0 ? (
          <ContentGrid title="" items={items} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-netflix-gray">
            <BookmarkX size={64} className="mb-4" />
            <p className="text-xl font-medium mb-2">Your list is empty</p>
            <p className="text-center max-w-md">
              Add shows and movies to keep track of what you want to watch.
              Click the + button on any title to add it to your list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;