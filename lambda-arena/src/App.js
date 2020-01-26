import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/game';
import Login from './components/login';

function App() {
  return (
    <div className="App" style={{width:'100%'}}>
      <header className="App-header">
      <Game style={{width:'100%'}}/>
      </header>
    </div>
  );
}

export default App;
