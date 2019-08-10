import React, {Component} from "react"
import MainTitle from './MainTitle'
import FloatingButton from './FloatingButton'
import SearchBar from './SearchBar'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import background from '../images/background.jpg'

const Container = styled.div`
display: flex;
background: url(${background});
background-size: cover;
box-shadow: inset 0px 10px 250px #000000;
justify-content: center;
align-items: center;
flex-direction: column;
`
const TitleSearchBarContainer = styled.div`
  margin-top: 300px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`



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
      return <Redirect push to={'/login'}></Redirect>
    }

    return(
      <Container>
      <a href="login" onClick={this.goToLogin} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Se connecter</FloatingButton></a>
      <TitleSearchBarContainer>
        <MainTitle />
        <SearchBar />
      </TitleSearchBarContainer>
    </Container>
      )
  }
}

export default HomePage