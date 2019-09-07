import React, {Component} from "react"
import styled from "styled-components"
import FloatingButton from '../components/FloatingButton'
import {Redirect} from 'react-router-dom'
import { ViewsNumber } from './ViewsNumber'
import {LikesNumber} from './LikesNumber'
import {ProfileButton} from './ProfileButton'
import base from '../base'
import 'firebase/auth'
import firebase from 'firebase/app'

const Container = styled.div`
margin-top: 15%;
display: flex;
justify-content: center;
align-items: center;
align-content:center;
flex-direction: column;
@media (max-width: 768px){
    margin-top: 20%;
}`

const ProfileDataContainer = styled.div`
display:flex;
margin-left: 10px;
align-content:space-between;
flex-direction:column;
@media (max-width: 768px){
    align-items:center;
}
`

const ProfileContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
@media (max-width: 768px) {
    flex-direction: column;
    justify-content:center;
    align-items:center;
  }`

const ViewsLikesContainer = styled.div`
display: flex;`

const Image = styled.div`
width: 360px;
height: 360px;
border-radius: 10.6303px;
border: 1px solid black;
background-size: cover;
@media (max-width: 768px){
    width: 128px;
    height: 119px;
}`

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 64px;
line-height: 75px;
color: #EFEFEFEF;
@media (max-width: 768px){
    font-size: 32px;
    line-height: 37px;
}`

const Place = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 37px;
color: #EFEFEF;
@media (max-width: 768px){
    font-size: 20px;
    line-height: 19px;
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
    left: 130px;
    top: 29px;
  }
`


class Profile extends Component{

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
        firebase.database().ref('/users/user-' + this.state.id).once('value').then(snapshot => {
            if(!snapshot.val()){
                this.setState({goToNotFound:true})
            }
            else{
                base.syncState(`/users/user-${this.state.id}/name`, {context: this,state: 'name'})
                base.syncState(`/users/user-${this.state.id}/url`, {context: this,state: 'url'})
                base.syncState(`/users/user-${this.state.id}/email`, {context: this,state: 'email'})
                base.syncState(`/users/user-${this.state.id}/city`, {context: this,state: 'city'})
                base.syncState(`/users/user-${this.state.id}/country`, {context: this,state: 'country'})
                base.syncState(`/users/user-${this.state.id}/isAdmin`, {context: this,state: 'isAdmin'})
                base.syncState(`/users/user-${this.state.id}/likesNumber`, {context: this,state: 'likesNumber'})
                base.syncState(`/users/user-${this.state.id}/viewsNumber`, {context: this,state: 'viewsNumber'})
            }
        })
        
    }

    handleAuth = async authData => {
        const currentUser = {
            uid: authData.user.uid,
            name: authData.user.displayName,
            email: authData.user.email,
            url: authData.user.photoURL,
        }
        this.setState({currentUser: currentUser})
        if (this.state.id === this.state.currentUser.uid) {
            this.setState({isUser: true})
        }
      }

    state = {
        id: this.props.match.params.id,
        goToHomePage: false,
        goToNotFound: false,
        goToProfileUpdate: false,
        currentUser: {},
        email: '',
        name: '',
        city: '',
        url: '',
        country: '',
        viewsNumber: '',
        likesNumber: '',
        isAdmin: ''
    }


    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
    }

    goToProfileUpdate = event => {
        event.preventDefault()
        this.setState({goToProfileUpdate: true})
    }


    render(){

        let adminButton;

        if(this.state.isAdmin && this.state.isUser){
            adminButton = <a href={`/admin`} style={{ textDecoration: 'none', color:'#EFEFEF' }}><ProfileButton contain="Menu Admin"/></a>
        }

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }

        if(this.state.goToNotFound){
            return <Redirect push to={'/userNotFound'}></Redirect>
        }

        if(this.state.goToProfileUpdate){
            return <Redirect push to={`/profileUpdate/${this.state.id}`}></Redirect>
        }

        let place;

        if(this.state.city && !this.state.country) {
            place = <Place>{this.state.city}</Place>
        } else if(this.state.country && !this.state.city) {
            place = <Place>{this.state.country}</Place>
        } else if(this.state.country && this.state.city){
            place = <Place>{this.state.city}, {this.state.country}</Place>
        } else {
            place = <Place></Place>
        }
        
        return(
            <>
            <Container>
                <Header>
                    <a href="/"  onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                </Header>
                <ProfileContainer>
                    <Image style={{ backgroundImage: `url(${this.state.url})`, backgroundColor: "white" }}  />
                    <ProfileDataContainer>
                        <Title>{this.state.name}</Title>
                        {place}
                        <ViewsLikesContainer>
                            <ViewsNumber viewsNumber={this.state.viewsNumber} />
                            <LikesNumber likesNumber={this.state.likesNumber} />
                        </ViewsLikesContainer> 
                        {this.state.isUser ? (
                            <a href={`/profileUpdate/${this.state.id}`} onClick={this.goToProfileUpdate} style={{ textDecoration: 'none', color:'#EFEFEF' }}><ProfileButton contain="Modifier le profil"/></a>
                        ) : (
                            <span></span>
                        )}  
                         {adminButton}           
                    </ProfileDataContainer>
                </ProfileContainer>
			</Container>
            </>
	    )
    }

  }
export default Profile