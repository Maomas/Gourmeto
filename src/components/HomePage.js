import React, {Component} from "react"
import './HomePage.css'
import MainTitle from './MainTitle'
import FloatingButton from './FloatingButton'
import SearchBar from './SearchBar'
import { Redirect } from 'react-router-dom'


class HomePage extends Component {
  state = {
    goToLogin: false
  }

  goToLogin = event => {
    event.preventDefault()
        this.setState({ goToLogin: true})
  }

  render(){

    if(this.state.goToLogin){
      return <Redirect to={'/login'}></Redirect>
  }

    return(
      <div className="container">
      <a href="login" onClick={this.goToLogin} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Se connecter</FloatingButton></a>
      <div className="titleSearchBarContainer">
        <MainTitle />
        <SearchBar />
      </div>
    </div>
      )
  }
}

export default HomePage