import React, {Component} from "react"

import styled from "styled-components"
import FloatingButton from '../components/FloatingButton'
import {Redirect} from 'react-router-dom'
import base from '../base'
import 'firebase/auth'
import firebase from 'firebase/app'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

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

const RedButton = styled.button`
cursor:pointer;
display: flex;
justify-content: center;
align-items: center;
width: 519.5px;
height: 58.85px;
background: #D51515;
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

const ImageContainer = styled.form`
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
        base.syncState(`/users/user-${this.state.id}/city`, {context: this,state: 'city'})
        base.syncState(`/users/user-${this.state.id}/country`, {context: this,state: 'country'})
        base.syncState(`/users/user-${this.state.id}/likesNumber`, {context: this,state: 'likesNumber'})
        base.syncState(`/users/user-${this.state.id}/viewsNumber`, {context: this,state: 'viewsNumber'}) 
        base.syncState(`/users/user-${this.state.id}/provider`, {context: this, state: 'provider'})   
    }

    state = {
        id: this.props.match.params.id,
        currentUser: {},
        email: '',
        name: '',
        city: '',
        url: '',
        country: '',
        viewsNumber: '',
        likesNumber: '',
        password: '',
        provider: '',
        goToHomePage: false,
        goToProfile: false
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

      handleDelete = event => {
        confirmAlert({
            title: 'Suppression du compte',
            message: 'Etes-vous sûr de vouloir supprimer votre compte ?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {
                    event.preventDefault()
                    var user = firebase.auth().currentUser
                    user.delete().then(function() {
                        var userId = user.uid;
                        firebase.database().ref('/users/user-' + userId).remove()
                        console.log('user deleted.')
                    }).catch(function(error) {
                        console.log(error)
                    });
                    this.logout()
                    this.setState({ goToHomePage: true })
                }
              },
              {
                label: 'Annuler',
                onClick: () => {}
              }
            ]
          });
      }

    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
    }

    goToProfile = event => {
        event.preventDefault()
        this.setState({ goToProfile: true})
    }

    handleSubmit = event => {
        event.preventDefault()   
        var user = firebase.auth().currentUser
        user.updateProfile({displayName: this.state.name}).then(function(){
            base.syncState(`/users/user-${this.state.id}/name`, {context: this,state: 'name'})
            console("update successful")
        }).catch(function(error){
            console.log(error)
        });
        user.updateEmail(this.state.email).then(function() {
            base.syncState(`/users/user-${this.state.id}/email`, {context: this,state: 'email'})
            console.log("update successful")
          }).catch(function(error) {
            console.log(error)
        });
        user.updatePassword(this.state.password).then(function() {
            console.log("update successful")
        }).catch(function(error) {
            console.log(error)
        });  
        base.syncState(`/users/user-${this.state.id}/city`, {context: this,state: 'city'})
        base.syncState(`/users/user-${this.state.id}/country`, {context: this,state: 'country'})
        this.setState({goToProfile: true})
    }

    handleChangeImage = event => {
        const url = event.target.value
        this.setState({ url })
    }

    handleChangeName = event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeEmail = event => {
        const email = event.target.value
        this.setState({ email })
    }

    handleChangeCountry = event => {
        const country = event.target.value
        this.setState({ country })
    }

    handleChangeCity = event => {
        const city = event.target.value
        this.setState({ city })
    }

    handleChangePassword = event => {
        const password = event.target.value
        this.setState( { password })
    }

    render(){

        let inputImage, inputPassword;

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }
        if(this.state.goToProfile){
            return <Redirect push to={`/profile/${this.state.currentUser.uid}`}></Redirect>
        }
        if(this.state.provider==='google' || this.state.provider==='facebook'){
            inputImage = <span></span>
            inputPassword = <span></span>
        } else{
            console.log(this.state.provider)
            inputImage = <Input type="file" onChange={this.handleChangeImage}/>
            inputPassword = <Input
            value={this.state.password}
            onChange={this.handleChangePassword}
            placeholder='Mot de passe'
            type='password'
            />
        }
        return(
            <>
            <Container>
                <Header>
                    <a href="/"  onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                </Header>
                <ProfileContainer>
                    <ImageContainer>
                        <Image style={{ backgroundImage: `url(${this.state.url})` }}  />
                        {inputImage}
                    </ImageContainer>
                    <ProfileDataContainer>
                        <Form onSubmit={this.handleSubmit}>
                        <Title>Modifier le profil</Title>
                            <Input
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            placeholder='Nom'
                            type="text"
                            required
                            />
                            <Input
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            placeholder='Email'
                            type="email"
                            required
                            />
                            <Input
                            value={this.state.city}
                            onChange={this.handleChangeCity}
                            placeholder='Ville'
                            type="text"
                            />
                            <Input
                            value={this.state.country}
                            onChange={this.handleChangeCountry}
                            placeholder='Pays'
                            type="text"
                            />
                            {inputPassword}
                            <Button type='submit'><Text>Modifier</Text></Button> 
                            <RedButton onClick={this.handleDelete}><Text>Supprimer</Text></RedButton>                         
                        </Form>   
                    </ProfileDataContainer>
                </ProfileContainer>
			</Container>
		    </>
        )
    }
}

export default ProfileUpdate