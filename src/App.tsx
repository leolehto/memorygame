import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p style={{fontSize: 20}}>Find the matching football teams as fast as possible</p>
      <div className='container'>
      <GameBoard />
      </div>
    </div>
  );
};

export default App;