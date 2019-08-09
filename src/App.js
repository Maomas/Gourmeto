import React from 'react'
import './App.css'
import MainTitle from './components/MainTitle'
import FloatingButton from './components/FloatingButton'
import SearchBar from './components/SearchBar'


function App() {
  return (
    <div className="container">
      <FloatingButton />
      <div className="titleSearchBarContainer">
        <MainTitle />
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
