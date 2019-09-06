import React, {Component} from "react"
import styled from "styled-components"
import FloatingButton from "../components/FloatingButton"
import {Redirect} from 'react-router-dom'
import { ViewsNumber } from "./ViewsNumber"
import ViewForm from "./ViewForm"
import ViewBoard from "./ViewBoard"
import base from '../base'
import 'firebase/auth'
import firebase from 'firebase/app'



const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
align-content:center;
flex-direction: column;
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

const PlaceContainer = styled.div`
margin-top: 300px;
display: flex;
flex-direction: row;
justify-content: space-evenly;
@media (max-width: 768px) {
    flex-direction: column;
  }
`

const PlaceDataContainer = styled.div`
diplay:flex;
margin-left: 10px;
align-content:space-between;
`

const Image = styled.div`
width: 360px;
height: 360px;
border-radius: 10.6303px;
border: 1px solid black;
background-size: cover;`

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 64px;
line-height: 75px;
color: #EFEFEFEF;`

const PlaceWrapper = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 37px;
color: #EFEFEF;`

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



class Place extends Component{

    componentDidMount() {
        firebase.database().ref('/places/place-' + this.state.id).once('value').then(snapshot => {
            if(!snapshot.val()){
                this.setState({goToNotFound:true})
            }
            else{
                base.syncState(`/places/place-${this.state.id}/name`, {context: this,state: 'place'})
                base.syncState(`/places/place-${this.state.id}/url`, {context: this,state: 'url'})
                base.syncState(`/places/place-${this.state.id}/city`, {context: this,state: 'city'})
                base.syncState(`/places/place-${this.state.id}/country`, {context: this,state: 'country'})
                base.syncState(`/places/place-${this.state.id}/viewsNumber`, {context: this,state: 'viewsNumberPlace'})
            }
        })
        firebase.database().ref('/users/user-'+this.state.currentUser.uid).once('value').then(snapshot => {
            base.syncState(`/users/user-${this.state.currentUser.uid}/viewsNumber`, {context: this, state: 'viewsNumberUser'})
        })

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
        base.syncState('/views', {
            context: this,
            state: 'views'
        })
    }

    state = {
        goToHomePage: false,
        goToNotFound: false,
        id: this.props.match.params.id,
        currentUser: {},
        name: '',
        place: '',
        city: '',
        url: '',
        country: '',
        viewsNumberPlace: '',
        viewsNumberUser: '',
        urlUser: '',
        views: {}
    }


    handleAuth = async authData => {
        let currentUser = {
            uid: authData.user.uid,
            name: '',
            email: authData.user.email,
            url: authData.user.photoURL
        }
        this.setState({currentUser: currentUser})
        var userId = this.state.currentUser.uid;
        return firebase.database().ref('/users/user-' + userId).once('value').then(snapshot => {
           var name = (snapshot.val() && snapshot.val().name);
           var urlUser = (snapshot.val() && snapshot.val().url);
           var viewsNumberUser = (snapshot.val() && snapshot.val().viewsNumber)
           this.setState({name: name})
           this.setState({urlUser: urlUser})
           this.setState({viewsNumberUser: viewsNumberUser})
           currentUser = {
               uid: this.state.currentUser.uid,
               name: this.state.name,
               email: this.state.currentUser.email,
               url: this.state.urlUser
           }
           this.setState({currentUser: currentUser})
        });
    }


    addView = view => {
        const views = {...this.state.views}
        views[`view-${Date.now()}`] = view
        this.setState({views})    
        var viewsNumberUser = parseInt(this.state.viewsNumberUser) + 1
        var viewsNumberPlace = parseInt(this.state.viewsNumberPlace) + 1
        this.setState({viewsNumberPlace: viewsNumberPlace.toString()})
        this.setState({viewsNumberUser: viewsNumberUser.toString()})
    }

    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
    }

    isUser = uid => uid === this.state.currentUser.uid

    render(){
        const views = Object.keys(this.state.views)
        .map(key => (
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
                /> 
        ))

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }

        if(this.state.goToNotFound){
            return <Redirect push to={'/placeNotFound'}></Redirect>
        }
        return(
        <>
            <Container>
                <Header>
                    <a href="/" onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                </Header>
                <PlaceContainer>
                    <Image style={{ backgroundImage: `url(${this.state.url})` }} />
                    <PlaceDataContainer>
                        <Title>{this.state.place}</Title>
                        <PlaceWrapper>{this.state.city}, {this.state.country}</PlaceWrapper>
                        <ViewsNumber viewsNumber={this.state.viewsNumberPlace}/>
                    </PlaceDataContainer>
                </PlaceContainer>   
                {this.state.currentUser.uid ? (
                    <ViewForm length={340} addView={this.addView} placeId={this.state.id} place={this.state.place} url={this.state.url} uid={this.state.currentUser.uid} userName={this.state.currentUser.name} urlUser={this.state.currentUser.url} />
                ) : (
                    <span></span>
                )} 
                    <ViewsList>
                        <ListTitle>Avis</ListTitle>
                        { views }
                    </ViewsList>
            </Container>
        </>
        )
    }
}

export default Place 