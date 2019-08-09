import React from "react"
import './HomePage.css'
import MainTitle from './MainTitle'
import FloatingButton from './FloatingButton'
import SearchBar from './SearchBar'


const HomePage = () => {

  return(
    <div className="container">
    <FloatingButton>Se connecter</FloatingButton>
    <div className="titleSearchBarContainer">
      <MainTitle />
      <SearchBar />
    </div>
  </div>
    )

}

export default HomePage