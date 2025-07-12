import React, { useState } from 'react';
import { TypewriterTitle } from './components/TypewriterTitle';
import { FounderGrid } from './components/FounderGrid';
import { foundersData } from './data/founders';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleTitleComplete = () => {
    setTitleComplete(true);
    setTimeout(() => {
      setShowContent(true);
    }, 1000);
  };

  const handleFounderClick = (id: string) => {
    // This would typically navigate to a detailed founder story page
    console.log(`Opening story for founder: ${id}`);
    // You could implement routing here or open a modal with the full story
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const toggleShowFavorites = () => {
    setShowFavoritesOnly(prev => !prev);
  };
  return (
    <div className="min-h-screen bg-black">
      <TypewriterTitle 
        text="Founderographies"
        onComplete={handleTitleComplete}
        isMovingUp={titleComplete}
      />
      
      {showContent && (
        <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'} pt-20`}>
          <FounderGrid 
            founders={foundersData}
            onFounderClick={handleFounderClick}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            showFavoritesOnly={showFavoritesOnly}
            onToggleShowFavorites={toggleShowFavorites}
          />
        </div>
      )}
    </div>
  );
}

export default App;