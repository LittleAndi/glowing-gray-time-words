import React, { useState, useEffect } from 'react';

interface WordGridProps {
  activeWords: string[];
}

const WordGrid = ({ activeWords }: WordGridProps) => {
  const [previousActiveWords, setPreviousActiveWords] = useState<string[]>([]);
  const [flickeringLetters, setFlickeringLetters] = useState<Set<string>>(new Set());

  const grid = [
    ['I', 'T', 'L', 'I', 'S', 'A', 'S', 'T', 'H', 'P', 'M', 'A'],
    ['A', 'C', 'Q', 'U', 'A', 'R', 'T', 'E', 'R', 'D', 'C', 'O'],
    ['T', 'W', 'E', 'N', 'T', 'Y', 'F', 'I', 'V', 'E', 'X', 'W'],
    ['T', 'H', 'A', 'L', 'F', 'Y', 'F', 'T', 'E', 'N', 'O', 'S'],
    ['M', 'I', 'N', 'U', 'T', 'E', 'S', 'E', 'T', 'O', 'U', 'R'],
    ['P', 'A', 'S', 'T', 'O', 'R', 'U', 'F', 'O', 'U', 'R', 'T'],
    ['S', 'E', 'V', 'E', 'N', 'X', 'T', 'W', 'E', 'L', 'V', 'E'],
    ['N', 'I', 'N', 'E', 'F', 'I', 'V', 'E', 'C', 'T', 'W', 'O'],
    ['E', 'I', 'G', 'H', 'T', 'F', 'E', 'L', 'E', 'V', 'E', 'N'],
    ['S', 'I', 'X', 'T', 'H', 'R', 'E', 'E', 'O', 'N', 'E', 'G'],
    ['T', 'E', 'N', 'S', 'E', 'O', '\'', 'C', 'L', 'O', 'C', 'K']
  ];

  const wordPositions = {
    'IT': [[0, 0], [0, 1]],
    'IS': [[0, 3], [0, 4]],
    'A': [[0, 5]],
    'QUARTER': [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]],
    'TWENTY': [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]],
    'FIVE': [[2, 6], [2, 7], [2, 8], [2, 9]],
    'HALF': [[3, 1], [3, 2], [3, 3], [3, 4]],
    'TEN': [[3, 7], [3, 8], [3, 9]],
    'MINUTES': [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6]],
    'TO': [[4, 8], [4, 9]],
    'PAST': [[5, 0], [5, 1], [5, 2], [5, 3]],
    'HOURFOUR': [[5, 7], [5, 8], [5, 9], [5, 10]],
    'HOURSEVEN': [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4]],
    'HOURTWELVE': [[6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11]],
    'HOURNINE': [[7, 0], [7, 1], [7, 2], [7, 3]],
    'HOURFIVE': [[7, 4], [7, 5], [7, 6], [7, 7]],
    'HOURTWO': [[7, 9], [7, 10], [7, 11]],
    'HOUREIGHT': [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4]],
    'HOURELEVEN': [[8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [8, 11]],
    'HOURSIX': [[9, 0], [9, 1], [9, 2]],
    'HOURTHREE': [[9, 3], [9, 4], [9, 5], [9, 6], [9, 7]],
    'HOURONE': [[9, 8], [9, 9], [9, 10]],
    'HOURTEN': [[10, 0], [10, 1], [10, 2]],
    "O'CLOCK": [[10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10], [10, 11]],
  };

  useEffect(() => {
    const newlyActiveWords = activeWords.filter(word => !previousActiveWords.includes(word));
    
    if (newlyActiveWords.length > 0) {
      const newFlickeringLetters = new Set<string>();
      
      newlyActiveWords.forEach(word => {
        const positions = wordPositions[word as keyof typeof wordPositions];
        positions?.forEach(([row, col]) => {
          newFlickeringLetters.add(`${row}-${col}`);
        });
      });
      
      setFlickeringLetters(newFlickeringLetters);
      
      // Clear flickering effect after animation completes
      setTimeout(() => {
        setFlickeringLetters(new Set());
      }, 600);
    }
    
    setPreviousActiveWords(activeWords);
  }, [activeWords, previousActiveWords]);

  const isLetterActive = (row: number, col: number): boolean => {
    return activeWords.some(word => {
      const positions = wordPositions[word as keyof typeof wordPositions];
      return positions?.some(([r, c]) => r === row && c === col);
    });
  };

  const isLetterFlickering = (row: number, col: number): boolean => {
    return flickeringLetters.has(`${row}-${col}`);
  };

  return (
    <div className="grid grid-cols-12 gap-1 p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700">
      {grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg"
          >
            <span
              className={`
                text-xl font-bold transition-all duration-300 ease-in-out
                ${isLetterActive(rowIndex, colIndex)
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'text-gray-600 hover:text-gray-500'
                }
                ${isLetterFlickering(rowIndex, colIndex) 
                  ? 'animate-pulse' 
                  : ''
                }
              `}
              style={isLetterFlickering(rowIndex, colIndex) ? {
                animation: 'flicker 1.5s ease-in-out'
              } : {}}
            >
              {letter}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default WordGrid;
