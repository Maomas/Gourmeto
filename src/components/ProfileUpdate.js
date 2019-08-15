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
flex-direction: column;`

const ProfileDataContainer = styled.div`
diplay:flex;
margin-left: 10px;
align-content:space-between;`

const ProfileContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;`

const ViewsLikesContainer = styled.div`
display: flex;`

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

const Place = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 37px;
color: #EFEFEF;`

const Header = styled.div`
position: absolute;
left: 80%;
top: 69px;
width: 600px;
display: flex;
justify-content:center;
align-items: center;
`



class ProfileUpdate extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
        base.syncState(`/users/user-${this.state.id}/name`, {context: this,state: 'name'})
        base.syncState(`/users/user-${this.state.id}/url`, {context: this,state: 'url'})
        base.syncState(`/users/user-${this.state.id}/email`, {context: this,state: 'email'})
        base.syncState(`/users/user-${this.state.id}/likesNumber`, {context: this,state: 'likesNumber'})
        base.syncState(`/users/user-${this.state.id}/viewsNumber`, {context: this,state: 'viewsNumber'})    
    }

    state = {
        id: this.props.match.params.id,
        currentUser: {},
        email: '',
        name: '',
        city: 'Mons',
        url: '',
        country: 'Belgique',
        viewsNumber: '',
        likesNumber: ''
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

    render(){
        return(
            <>
            <Container>
                <Header>
                    <a href="/"  onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                </Header>
                <ProfileContainer>
                    <Image style={{ backgroundImage: `url(${this.state.url})` }}  />
                    <ProfileDataContainer>
                        <Title>{this.state.name}</Title>
                        <Place>{this.state.city}, {this.state.country}</Place>
                        <ViewsLikesContainer>
                            <ViewsNumber viewsNumber={this.state.viewsNumber} />
                            <LikesNumber likesNumber={this.state.likesNumber} />
                        </ViewsLikesContainer>
                    </ProfileDataContainer>
                </ProfileContainer>
			</Container>
		    </>
        )
    }
}

export default ProfileUpdate