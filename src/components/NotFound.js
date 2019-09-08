import React, {Component} from "react"
import FloatingButton from './FloatingButton'
import styled, {createGlobalStyle} from 'styled-components'
import {Redirect} from 'react-router-dom'


const Container = styled.div`
display: flex;
justify-content:center;
align-items:center;
background-size: cover;
flex-direction: column;`

const GlobalStyles = createGlobalStyle`
  body {
    @import url('//fonts.googleapis.com/css?family=Satisfy');
    font-family: 'Satisfy', sans-serif;
  }
`

const Header = styled.div`
margin-top: 69px;
display: flex;
justify-content:center;
align-content:center;
@media (max-width: 768px) {
  margin-top: 29px;
}
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
align-items:center;
@media (max-width: 768px){
  font-size: 64px;
}`

const Text = styled.span`
text-align:center;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #FFFFFF;
border-radius: 4px;
@media (max-width: 768px){
  font-size: 18px;
}`

class NotFound extends Component{

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
            <Text>La page que vous recherchez n'existe pas ou a été supprimé.</Text>
        </Container>
        </>
    )
}
}

export default NotFound