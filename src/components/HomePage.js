import React, {Component} from "react"
import MainTitle from './MainTitle'
import FloatingButton from './FloatingButton'
import SearchBar from './SearchBar'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import ViewBoard from './ViewBoard'
import base from '../base'
import firebase from 'firebase/app'
import 'firebase/auth'

const Container = styled.div`
height:100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-bottom: 100px;
`
const TitleSearchBarContainer = styled.div`
  margin-top: 300px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`

const ListTitle = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 51.6px;
line-height: 60px;
margin-top: 200px;
color: #EFEFEF;
margin-bottom: 20px;`


const ViewsList = styled.div`
display:flex;
flex-direction:column;`

const Header = styled.div`
position: absolute;
left: 80%;
top: 69px;
width: 600px;
display: flex;
justify-content:center;
align-items: center;
`



class HomePage extends Component {

  state = {
    goToLogin: false,
    views: {},
    currentUser: {},
  }

  componentDidMount() {
    base.syncState('/views', {
        context: this,
        state: 'views'
    })
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.handleAuth({ user })
        }        
  })
}


handleAuth = async authData => {
  const currentUser = {
      uid: authData.user.uid,
      name: authData.user.displayName,
      email: authData.user.email,
      url: authData.user.photoURL,
      isLoggedIn: true
  }
  this.setState({currentUser: currentUser})
}

logout = async () => {
  await firebase.auth().signOut()
  this.setState({currentUser: {}})
}

isUser = uid => uid === this.state.currentUser.uid

  goToLogin = event => {
    event.preventDefault()
        this.setState({ goToLogin: true})
  }

  render(){
    const views = Object.keys(this.state.views)
        .map(key => (
                <ViewBoard
                key={key}
                id={this.state.views[key].id}
                uid={this.state.views[key].uid} 
                isUser={this.isUser}
                name={this.state.views[key].userName}
                time='0 minutes'
                place={this.state.views[key].place}
                description={this.state.views[key].view}
                url={this.state.views[key].url}
                urlUser={this.state.views[key].urlUser}
                />
          ))

    if(this.state.goToLogin){
      return <Redirect push to={'/login'}></Redirect>
    }

    return(
      <Container>
      <Header>
        {this.state.currentUser.uid ? (
          <FloatingButton onClick={this.logout}>Se déconnecter</FloatingButton>
        ) : (
          <a href="login" onClick={this.goToLogin} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Se connecter</FloatingButton></a>
        )}
      </Header>
      <TitleSearchBarContainer>
        <MainTitle />
        <SearchBar />
      </TitleSearchBarContainer>
      <ViewsList>
        <ListTitle>Avis</ListTitle>
          { views }
        </ViewsList>
    </Container>
      )
  }
}

export default HomePage