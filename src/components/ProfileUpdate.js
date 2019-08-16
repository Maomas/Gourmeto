import React, {Component} from "react"

import styled from "styled-components"
import FloatingButton from '../components/FloatingButton'
import {Redirect} from 'react-router-dom'
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

const Button = styled.button`
cursor:pointer;
display: flex;
justify-content: center;
align-items: center;
width: 519.5px;
height: 58.85px;
background: #C4C4C4;
mix-blend-mode: hard-light;
border: 1.0022px solid #FFFFFF;
backdrop-filter: blur(4.00879px);
border-radius: 7.40084px;
margin-top:30px
`
const Text = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #FFFFFF;
border-radius: 4px;
`

const ProfileDataContainer = styled.div`
diplay:flex;
margin-left: 10px;
align-content:space-between;
margin-left: 50px;`

const ProfileContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;`

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

const Form = styled.form`
display: flex;
flex-direction:column;
`

const Input = styled.input`
width: 495.5px;
height: 79px;
background: #EFEFEF;
padding: 10px;
border-radius: 219.444px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
margin-top: 25px;
color: #000000;
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
                        <Form onSubmit={this.goToHomePage}>
                        <Title>Modifier le profil</Title>
                            <Input
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder='Nom'
                            type="text"
                            required
                            />
                            <Input
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder='Email'
                            type="email"
                            required
                            />
                            <Input
                            value={this.state.city}
                            onChange={this.handleChange}
                            placeholder='Ville'
                            type="text"
                            required
                            />
                            <Input
                            value={this.state.country}
                            onChange={this.handleChange}
                            placeholder='Pays'
                            type="text"
                            required
                            />
                            <Input
                            placeholder='Mot de passe'
                            type='password'
                            required
                            />
                            <Input
                            placeholder='Valider le mot de passe'
                            type='password'
                            required
                            />
                            <Button type='submit'><Text>Modifier</Text></Button>                       
                        </Form>   
                    </ProfileDataContainer>
                </ProfileContainer>
			</Container>
		    </>
        )
    }
}

export default ProfileUpdate