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

const SearchBarResults = styled.div`
display:flex;
flex-direction:column;
display: none;
position:absolute;
margin-top: 70px;
width: 430px;
@media (max-width: 768px) {
  margin-top: 60px;
}
`

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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ListTitle = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 51.6px;
line-height: 60px;
margin-top: 200px;
color: #EFEFEF;
margin-bottom: 20px;
@media (max-width: 768px) {
  font-size: 20px;
  line-height: 23px;
}
`
const ViewsList = styled.div`
display:flex;
flex-direction:column;
@media (max-width: 768px) {
  justify-content:center;
  align-items: center;
}
`

const Header = styled.div`
position: absolute;
right: 10px;
top: 69px;
width: 600px;
display: flex;
justify-content:center;
align-items: center;
@media (max-width: 768px) {
  left: 50px;
}
`

const SearchBarContainer = styled.div`
display: flex;
flex-direction: column;
margin-left: 70px;
@media (max-width: 768px) {
  margin-left: 0px;
}
`

const SearchResult = styled.div`
display: flex;
background-color: #EFEFEF;
padding:10px;
border: 1px solid #C4C4C4;
cursor:pointer;
flex-direction:row;
height: 50px;
align-items:center;
@media (max-width: 768px) {
  height: 20px;
  width: 310px;
}
`

const SuggestionContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
font-family: Roboto;
font-style: normal;
font-size: 30px;
line-height: 19px;
margin-top:100px;
color: #EFEFEF;
`

const StrongText = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 19px;
color: #000000;
@media (max-width: 768px) {
  font-size: 15px;
}
`

const Text = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 30px;
line-height: 19px;
color: #000000;
@media (max-width: 768px) {
  font-size: 15px;
}
`


class HomePage extends Component {

  state = {
    goToLogin: false,
    goToProfile: false,
    goToHomePage: false,
    views: {},
    places: {},
    likes: {},
    currentUser: {},
    search: '',
    isSearchBarOnFocus: false,
    isAdmin: false
  }
    

  componentDidMount() {
    base.syncState('/views', {
        context: this,
        state: 'views'
    })
    base.syncState('/likes', {
      context: this,
      state: 'likes'
  })
    base.syncState('/places', {
      context: this,
      state:'places'
    })
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.handleAuth({ user })
        }        
  })
}

searchingFor(search){
  return x => {
    return this.state.places[x].name.toLowerCase().includes(search.toLowerCase()) || !search;
  }
}

handleAuth = async authData => {
  const currentUser = {
      uid: authData.user.uid,
      name: authData.user.displayName,
      email: authData.user.email,
      url: authData.user.photoURL
  }
  this.setState({currentUser: currentUser})  
}

logout = async () => {
  await firebase.auth().signOut()
  this.setState({currentUser: {}})
}

handleFocus = event => {
  event.preventDefault()
  this.setState({isSearchBarOnFocus: true})
}

handleBlur = event => {
  event.preventDefault()
  setTimeout(function() { 
    this.setState({isSearchBarOnFocus: false})
}.bind(this), 100)
}

  goToLogin = event => {
    event.preventDefault()
    this.setState({ goToLogin: true})
  }
  goToProfile = event => {
    event.preventDefault()
    this.setState({ goToProfile: true})
  }

  handleSearch = event => {
    event.preventDefault()
    this.setState({search: event.target.value})
  }


  render(){
    let suggestionContainer;


    if(this.state.currentUser.uid){
      suggestionContainer = <SuggestionContainer>
      <span>Vous ne trouvez pas le lieu que vous avez visité ?&nbsp;&nbsp;</span><a style={{ marginTop: '10px' }} href="/suggestion">Faites une suggestion</a>
    </SuggestionContainer>
    }

      const places = Object.keys(this.state.places)
      .filter(this.searchingFor(this.state.search))
      .map(key => (
        <SearchResult><a href={`/place/${key.substring(6)}`} style={{ textDecoration: 'none', color:'#EFEFEF' }}><StrongText>{this.state.places[key].name}&nbsp;&nbsp;</StrongText><Text>{this.state.places[key].city}, {this.state.places[key].country}</Text></a></SearchResult>
      ))

    const views = Object.keys(this.state.views)
        .map(key => (
                <ViewBoard
                id={key}
                placeId={this.state.views[key].placeId}
                uid={this.state.views[key].uid} 
                name={this.state.views[key].userName}
                time={this.state.views[key].time}
                place={this.state.views[key].place}
                description={this.state.views[key].view}
                url={this.state.views[key].url}
                urlUser={this.state.views[key].urlUser}
                currentUserId={this.state.currentUser.uid}
                admin='false'
                />
          ))

    if(this.state.goToLogin){
      return <Redirect push to={'/login'}></Redirect>
    }

    if(this.state.goToProfile){
      return <Redirect push to={`/profile/${this.state.currentUser.uid}`}></Redirect>
    }

    return(
      <Container>
      <Header>
        {this.state.currentUser.uid ? (
          <>
          <FloatingButton onClick={this.goToProfile}>Mon Profil</FloatingButton>
          <FloatingButton onClick={this.logout}>Se déconnecter</FloatingButton>
          </>
        ) : (
          <a href="login" onClick={this.goToLogin} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Se connecter</FloatingButton></a>
        )}
      </Header>
      <TitleSearchBarContainer>
        <MainTitle />
        <SearchBarContainer>
          <SearchBar onChange={this.handleSearch} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
          {this.state.isSearchBarOnFocus ? (
            <SearchBarResults style={{display: 'block'}}>
              {places}
            </SearchBarResults>
          ) : (
            <SearchBarResults>
              {places}
            </SearchBarResults>
          )}
        </SearchBarContainer>
      </TitleSearchBarContainer>
      {suggestionContainer}
      <ViewsList>
        <ListTitle>Avis</ListTitle>
          { views }
        </ViewsList>
    </Container>
      )
  }
}

export default HomePage

