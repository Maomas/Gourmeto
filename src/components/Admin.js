import React, {Component} from "react"
import styled from "styled-components"
import base from '../base'
import 'firebase/auth'
import firebase from 'firebase/app'
import {Redirect} from 'react-router-dom'
import ViewBoard from "./ViewBoard"
import UserBoard from "./UserBoard"
import PlaceBoard from "./PlaceBoard"
import SuggestionBoard from "./SuggestionBoard"
import FloatingButton from "../components/FloatingButton"
import PlaceForm from "../components/PlaceForm"

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 64px;
line-height: 75px;
color: #EFEFEFEF;
@media (max-width: 768px) {
    font-size: 32px;
}`

const SpaceBetween = styled.div`
width: 20px;
`

const Container = styled.div`
display: flex;
align-content:center;
flex-direction:column;
margin-top: 10%;
margin-left: 5%;
margin-right: 5%;
@media (max-width: 768px) {
    margin-top: 150px;
}`

const Header = styled.div`
position: absolute;
left: 80%;
top: 69px;
width: 600px;
display: flex;
justify-content:center;
align-items: center;
@media (max-width: 768px) {
    left: 80px;
}`

const Highlighting = styled.div`
background: #C4C4C4;
border-radius: 12.069px;
height: 12px;
@media (max-width: 768px) {
    height: 6px;
}
`

const UsersContainer = styled.div`
display:flex;
flex-direction:column;
`

const PlacesContainer = styled.div`
display:flex;
flex-direction:column;
`

const ViewsContainer = styled.div`
display:flex;
flex-direction:column;
`

const SuggestionsContainer = styled.div`
display:flex;
flex-direction:column;
`

const ViewsListContainer = styled.div`
display:flex;
flex-direction:flex-start;
flex-wrap:wrap;
`
const SuggestionsListContainer = styled.div`
display:flex;
flex-direction:flex-start;
flex-wrap:wrap;
`

const UsersListContainer = styled.div`
display:flex;
flex-direction:start;
flex-wrap:wrap;
`

const PlacesListContainer = styled.div`
display:flex;
flex-direction:start;
flex-wrap:wrap;
`

class Admin extends Component{

    state= {
        isAdmin: null,
        goToHomePage: false,
        users: {},
        views: {},
        places: {},
        suggestions: {},
        currentUser: {}
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
        base.syncState('/users', {
            context: this,
            state: 'users'
        })
        base.syncState('/views', {
            context: this,
            state: 'views'
        })
        base.syncState('/places', {
            context: this,
            state: 'places'
        })
        base.syncState('/suggestions', {
            context: this,
            state: 'suggestions'
        })
        
    }

    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
    }

    handleAuth = async authData => {
        const currentUser = {
            uid: authData.user.uid,
            name: authData.user.displayName,
            email: authData.user.email,
            url: authData.user.photoURL,
        }
        this.setState({currentUser: currentUser})
        firebase.database().ref('/users/user-' + this.state.currentUser.uid).once('value').then(snapshot => {
            if(!snapshot.val().isAdmin){
                this.setState({goToHomePage: true})
            }
        })
      }

    render() {

        const suggestions = Object.keys(this.state.suggestions)
        .map(key => (
            <>
            <SuggestionBoard
                id={key}
                name={this.state.suggestions[key].name}
                url={this.state.suggestions[key].url}
                city={this.state.suggestions[key].city}
                country={this.state.suggestions[key].country}
                uid={this.state.suggestions[key].uid}
            />
            <SpaceBetween />
            </>
        ))
        const users = Object.keys(this.state.users)
        .map(key => (
            <>
            <UserBoard
                id={key}
                city={this.state.users[key].city}
                country={this.state.users[key].country}
                isAdmin={this.state.users[key].isAdmin}
                likesNumber={this.state.users[key].likesNumber}
                name={this.state.users[key].name}
                provider={this.state.users[key].provider}
                url={this.state.users[key].url}
                viewsNumber={this.state.users[key].viewsNumber}
            />   
            <SpaceBetween/>
            </>   
        ))
        const views = Object.keys(this.state.views)
        .map(key => (
            <>
            <ViewBoard
                id={key}
                placeId={this.state.views[key].placeId}
                isUser={this.isUser}
                name={this.state.views[key].userName}
                time={this.state.views[key].time}
                place={this.state.views[key].place}
                description={this.state.views[key].view}
                url={this.state.views[key].url}
                urlUser={this.state.views[key].urlUser}
                uid={this.state.views[key].uid}
                currentUserId={this.state.currentUser.uid}
                admin='true'
            /> 
            <SpaceBetween/>
            </>
        ))
        const places = Object.keys(this.state.places)
        .map(key => (
            <>
            <PlaceBoard
                id={key}
                city={this.state.places[key].city}
                country={this.state.places[key].country}
                name={this.state.places[key].name}
                url={this.state.places[key].url}
                viewsNumber={this.state.places[key].viewsNumber}
            />
            <SpaceBetween/>
            </>
        ))

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }
        return(
            
            <>
            <Container>
                <Header>
                    <a href="/" onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                </Header>
                <UsersContainer>
                    <Title>Gestion des utilisateurs</Title>
                    <Highlighting />
                    <UsersListContainer>
                        {users}
                    </UsersListContainer>
                </UsersContainer>
                <PlacesContainer>
                    <Title>Gestion des lieux</Title>
                    <Highlighting />
                    <PlacesListContainer>
                        <PlaceForm />
                        {places}
                    </PlacesListContainer>
                </PlacesContainer>
                <ViewsContainer>
                    <Title>Gestion des avis</Title>
                    <Highlighting />
                    <ViewsListContainer>
                    {views}
                    </ViewsListContainer>
                </ViewsContainer>
                <SuggestionsContainer>
                    <Title>Gestion des suggestions</Title>
                    <Highlighting />
                    <SuggestionsListContainer>
                        {suggestions}
                    </SuggestionsListContainer>
                </SuggestionsContainer>
            </Container>
            </>
        )
    }
}

export default Admin;