import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <GameBoard />
    </div>
  );
};

export default App;