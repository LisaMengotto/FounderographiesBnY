import React, { useState, useEffect } from 'react';

interface TypewriterTitleProps {
  text: string;
  onComplete: () => void;
  isMovingUp: boolean;
}

export const TypewriterTitle: React.FC<TypewriterTitleProps> = ({ 
  text, 
  onComplete, 
  isMovingUp 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else if (currentIndex === text.length) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, text, onComplete]);

  return (
    <div className={`transition-all duration-1000 ease-in-out ${
      isMovingUp 
        ? 'fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 py-4' 
        : 'flex items-center justify-center min-h-screen'
    }`}>
      <div className={`${isMovingUp ? 'text-center' : ''}`}>
        <h1 className={`font-bold text-white transition-all duration-1000 ${
          isMovingUp ? 'text-xl md:text-2xl' : 'text-4xl md:text-6xl lg:text-7xl'
        }`}>
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    </div>
  );
};