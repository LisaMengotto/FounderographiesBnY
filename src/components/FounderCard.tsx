import React from 'react';
import { Heart } from 'lucide-react';

interface FounderCardProps {
  founder: {
    id: string;
    name: string;
    title: string;
    company: string;
    preview: string;
    category: string;
  };
  onClick: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const FounderCard: React.FC<FounderCardProps> = ({ 
  founder, 
  onClick, 
  isFavorite, 
  onToggleFavorite 
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(founder.id);
  };

  return (
    <div 
      className="group relative bg-black border border-white rounded-lg p-6 cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden"
      onClick={() => onClick(founder.id)}
    >
      {/* Gold shining effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      
      {/* Gold border glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-400/50 via-yellow-300/50 to-yellow-400/50 blur-sm -z-10" />
      
      {/* Favorite heart button */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 z-20 ${
          isFavorite 
            ? 'opacity-100' 
            : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <Heart 
          className={`h-5 w-5 transition-all duration-300 ${
            isFavorite 
              ? 'text-white fill-white' 
              : 'text-white hover:text-yellow-400'
          }`}
        />
      </button>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors duration-300">
          {founder.name}
        </h3>
        <p className="text-white text-sm mb-1">{founder.title}</p>
        <p className="text-white text-sm mb-4 font-medium">{founder.company}</p>
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {founder.preview}
        </p>
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 bg-gray-800 text-yellow-400 text-xs font-medium rounded-full border border-gray-700">
            {founder.category}
          </span>
          <span className="text-yellow-400 text-sm font-medium group-hover:text-yellow-300 transition-colors duration-300">
            Read Story →
          </span>
        </div>
      </div>
    </div>
  );
};