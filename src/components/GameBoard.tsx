import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

const names = ["Juventus", "Barcelona", "Real Madrid", "Ajax", "Chelsea", "Dortmund", "Benfica", "Gnistan"];

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState(() => shuffleArray([...names, ...names]));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<Set<number>>(new Set());
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (!isTimerRunning && timer !== 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
},[isTimerRunning, timer]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards(new Set([...matchedCards, firstIndex, secondIndex]));
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices, cards, matchedCards]);

  useEffect(() => {
    if(matchedCards.size === cards.length) {
        setIsTimerRunning(false);
        setTimeout(() => resetGame(), 2000);
    }
  }, [matchedCards, cards.length])

  const handleCardClick = (index: number) => {
    if (!isTimerRunning) {
        setIsTimerRunning(true);
      }
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedCards.has(index)) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };
  const resetGame = () => {
    setCards(shuffleArray([...names, ...names]));
    setFlippedIndices([]);
    setMatchedCards(new Set());
    setTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <div>
        <div className="timer">Time: {timer} seconds</div>
     <div className="game-board">
      {cards.map((name, index) => (
        <Card
          key={index}
          id={index}
          name={name}
          flipped={flippedIndices.includes(index) || matchedCards.has(index)}
          onClick={handleCardClick}
        />
      ))}
    </div>

    </div>
   
  );
};

export default GameBoard;
