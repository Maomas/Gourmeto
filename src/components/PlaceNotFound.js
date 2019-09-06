import React, {Component} from "react"
import FloatingButton from './FloatingButton'
import styled, {createGlobalStyle} from 'styled-components'
import background from '../images/background.gif'
import {Redirect} from 'react-router-dom'


const Container = styled.div`
height:1600px;
display: flex;
background: url(${background});
background-size: cover;
box-shadow: inset 0px 10px 250px #000000;
justify-content: center;
align-items: center;
flex-direction: column;
`

const GlobalStyles = createGlobalStyle`
  body {
    @import url('//fonts.googleapis.com/css?family=Satisfy');
    font-family: 'Satisfy', sans-serif;
  }
`

const Header = styled.div`
position: absolute;
left: 80%;
top: 69px;
width: 600px;
display: flex;
justify-content:center;
align-items: center;
`

const Title = styled.div`
font-family: Satisfy;
font-style: normal;
font-weight: normal;
font-size: 148.396px;
line-height: 214px;
color: #EFEFEF;
display:flex;
justify-content: center;
align-items:center;`

const Text = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #FFFFFF;
border-radius: 4px;`

class PlaceNotFound extends Component{

  state = {
    goToHomePage: false
}

goToHomePage = event => {
    event.preventDefault()
    this.setState({ goToHomePage: true})
}

  render(){

    if(this.state.goToHomePage){
      return <Redirect push to={'/'}></Redirect>
  }
    return(
        <>
        <Header><a href="/"  onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a></Header>
        <Container>
            <GlobalStyles />
            <Title>Oups !</Title>
            <Text>Le lieu que vous recherchez n'existe pas ou a été supprimé.</Text>
        </Container>
        </>
    )
}
}

export default PlaceNotFound