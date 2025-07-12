import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  resultsCount: number;
  totalCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  resultsCount, 
  totalCount 
}) => {
  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="mb-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search founders by name, company, or keywords..."
            className="w-full pl-12 pr-12 py-4 bg-black border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
          />
          
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {searchTerm && (
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-sm">
              {resultsCount === 0 ? (
                <span className="text-gray-400">No founders found matching "{searchTerm}"</span>
              ) : (
                <span>
                  Showing {resultsCount} of {totalCount} founder{resultsCount !== 1 ? 's' : ''} 
                  {resultsCount < totalCount && (
                    <span className="text-yellow-400 ml-1">matching "{searchTerm}"</span>
                  )}
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};