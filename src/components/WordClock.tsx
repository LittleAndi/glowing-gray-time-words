
import React, { useState, useEffect } from 'react';
import WordGrid from './WordGrid';

const WordClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeWords = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Convert to 12-hour format
    const hour12 = hours % 12 || 12;
    
    const timeWords = ['IT', 'IS'];
    
    // Minutes logic
    if (minutes >= 5 && minutes < 10) {
      timeWords.push('FIVE', 'MINUTES', 'PAST');
    } else if (minutes >= 10 && minutes < 15) {
      timeWords.push('TEN', 'MINUTES', 'PAST');
    } else if (minutes >= 15 && minutes < 20) {
      timeWords.push('QUARTER', 'PAST');
    } else if (minutes >= 20 && minutes < 25) {
      timeWords.push('TWENTY', 'MINUTES', 'PAST');
    } else if (minutes >= 25 && minutes < 30) {
      timeWords.push('TWENTY', 'FIVE', 'MINUTES', 'PAST');
    } else if (minutes >= 30 && minutes < 35) {
      timeWords.push('THIRTY', 'MINUTES', 'PAST');
    } else if (minutes >= 35 && minutes < 40) {
      timeWords.push('TWENTY', 'FIVE', 'MINUTES', 'TO');
    } else if (minutes >= 40 && minutes < 45) {
      timeWords.push('TWENTY', 'MINUTES', 'TO');
    } else if (minutes >= 45 && minutes < 50) {
      timeWords.push('QUARTER', 'TO');
    } else if (minutes >= 50 && minutes < 55) {
      timeWords.push('TEN', 'MINUTES', 'TO');
    } else if (minutes >= 55) {
      timeWords.push('FIVE', 'MINUTES', 'TO');
    }
    
    // Adjust hour for "TO" cases
    let displayHour = hour12;
    if (minutes >= 35) {
      displayHour = hour12 % 12 + 1;
      if (displayHour > 12) displayHour = 1;
    }
    
    // Hour words
    const hourWords = {
      1: 'HOURONE', 2: 'HOURTWO', 3: 'HOURTHREE', 4: 'HOURFOUR', 5: 'HOURFIVE', 6: 'HOURSIX',
      7: 'HOURSEVEN', 8: 'HOUREIGHT', 9: 'HOURNINE', 10: 'HOURTEN', 11: 'HOURELEVEN', 12: 'HOURTWELVE'
    };
    
    timeWords.push(hourWords[displayHour as keyof typeof hourWords]);
    
    // Add O'CLOCK for exact hours
    if (minutes < 5 || minutes >= 55) {
      timeWords.push("O'CLOCK");
    }
    
    return timeWords;
  };

  const activeWords = getTimeWords(currentTime);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">Word Clock</h1>
        <p className="text-gray-400">Current time displayed in words</p>
      </div>
      
      <WordGrid activeWords={activeWords} />
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Digital: {currentTime.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default WordClock;
