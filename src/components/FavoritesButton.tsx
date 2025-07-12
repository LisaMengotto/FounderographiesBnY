import React from 'react';
import { Heart } from 'lucide-react';

interface FavoritesButtonProps {
  showFavoritesOnly: boolean;
  onToggle: () => void;
  favoritesCount: number;
}

export const FavoritesButton: React.FC<FavoritesButtonProps> = ({
  showFavoritesOnly,
  onToggle,
  favoritesCount
}) => {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={onToggle}
        className={`flex items-center gap-4 px-6 py-3 rounded-2xl border-2 transition-all duration-300 ${
          showFavoritesOnly
            ? 'bg-yellow-400 border-yellow-400 text-black'
            : 'bg-transparent border-white text-white hover:border-yellow-400 hover:text-yellow-400'
        }`}
      >
        <Heart 
          className={`h-5 w-5 transition-all duration-300 ${
            showFavoritesOnly 
              ? 'fill-black text-black' 
              : 'text-white'
          }`}
        />
        <span className="font-medium flex items-center gap-1">
          {showFavoritesOnly ? 'Show All' : 'Favorites'}
          {favoritesCount > 0 && !showFavoritesOnly &&( 
            <span>({favoritesCount})</span>
          )}
        </span>
      </button>
    </div>
  );
};