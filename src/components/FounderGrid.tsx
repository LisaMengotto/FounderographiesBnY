import React from 'react';
import { Search } from 'lucide-react';
import { FounderCard } from './FounderCard';
import { SearchBar } from './SearchBar';
import { FavoritesButton } from './FavoritesButton';

interface Founder {
  id: string;
  name: string;
  title: string;
  company: string;
  preview: string;
  category: string;
}

interface FounderGridProps {
  founders: Founder[];
  onFounderClick: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  showFavoritesOnly: boolean;
  onToggleShowFavorites: () => void;
}

export const FounderGrid: React.FC<FounderGridProps> = ({ 
  founders, 
  onFounderClick, 
  searchTerm, 
  onSearchChange,
  favorites,
  onToggleFavorite,
  showFavoritesOnly,
  onToggleShowFavorites
}) => {
  // Filter founders based on search term and favorites
  let filteredFounders = founders.filter(founder => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      founder.name.toLowerCase().includes(searchLower) ||
      founder.company.toLowerCase().includes(searchLower) ||
      founder.title.toLowerCase().includes(searchLower) ||
      founder.preview.toLowerCase().includes(searchLower) ||
      founder.category.toLowerCase().includes(searchLower)
    );
  });

  // Further filter by favorites if showing favorites only
  if (showFavoritesOnly) {
    filteredFounders = filteredFounders.filter(founder => favorites.has(founder.id));
  }
  return (
    <div>
      <div className="container mx-auto px-6 pb-12">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          resultsCount={filteredFounders.length}
          totalCount={founders.length}
        />
        
        <FavoritesButton 
          showFavoritesOnly={showFavoritesOnly}
          onToggle={onToggleShowFavorites}
          favoritesCount={favorites.size}
        />
        
        {!searchTerm && !showFavoritesOnly && (
          <div className="text-center mb-12">
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover the untold stories of innovative founders who are shaping the future. 
              Each biography reveals the journey, challenges, and triumphs behind the vision.
            </p>
          </div>
        )}
      
        {filteredFounders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFounders.map((founder) => (
              <FounderCard 
                key={founder.id} 
                founder={founder} 
                onClick={onFounderClick}
                isFavorite={favorites.has(founder.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (searchTerm || showFavoritesOnly) ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {showFavoritesOnly ? 'No favorites yet' : 'No founders found'}
              </h3>
              <p className="text-gray-400 mb-6">
                {showFavoritesOnly 
                  ? 'Start adding founders to your favorites by clicking the heart icon on any card.'
                  : 'Try adjusting your search terms or browse all founder stories.'
                }
              </p>
              <button
                onClick={() => {
                  onSearchChange('');
                  if (showFavoritesOnly) onToggleShowFavorites();
                }}
                className="px-6 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition-colors duration-200"
              >
                View All Founders
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};