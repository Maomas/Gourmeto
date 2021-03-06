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
display: flex;
justify-content: center;
align-items: center;
align-content:center;
flex-direction: column;
margin-bottom: 100px;
@media (max-width: 768px){
    margin-top: 20%;
    margin-bottom: 100px;
}`

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
margin-top:30px;
@media (max-width: 768px){
    width: 236px;
    height: 28px;
}
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
margin-top:30px;
@media (max-width: 768px){
    width: 236px;
    height: 28px;
}
`
const Text = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #FFFFFF;
border-radius: 4px;
@media (max-width: 768px){
    font-size: 12.5571px;
    line-height: 15px;
}
`

const ProfileDataContainer = styled.div`
diplay:flex;
margin-left: 10px;
align-content:space-between;
margin-left: 50px;
@media (max-width: 768px){
    margin-left: 0px;
}`

const ProfileContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
@media (max-width: 768px) {
    flex-direction: column;
    align-items:center;
  }`

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
@media (max-width: 768px){
    width: 238.5px;
    height: 36px;
    font-size: 12px;
    line-height: 14px;
     padding: 2px;
}
`

const Header = styled.div`
display: flex;
margin-top: 69px;
margin-bottom: 100px;
@media (max-width: 768px) {
  margin-top: 0px;
  margin-bottom: 100px;
}
`



class ProfileUpdate extends Component {

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
                base.syncState(`/users/user-${this.state.id}/likesNumber`, {context: this,state: 'likesNumber'})
                base.syncState(`/users/user-${this.state.id}/viewsNumber`, {context: this,state: 'viewsNumber'}) 
                base.syncState(`/users/user-${this.state.id}/provider`, {context: this, state: 'provider'})   
            }
        })
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
        goToProfile: false,
        goToNotFound: false
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
                    this.setState({ goToHomePage: true })
                    this.logout()
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

        let inputImage, inputPassword, inputEmail;

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }
        if(this.state.goToNotFound){
            return <Redirect push to={'/userNotFound'}></Redirect>
        }

        if(this.state.goToProfile){
            return <Redirect push to={`/profile/${this.state.currentUser.uid}`}></Redirect>
        }
        if(this.state.provider==='google' || this.state.provider==='facebook'){
            inputImage = <span></span>
            inputEmail = <span></span>
            inputPassword = <span></span>
        } else{
            inputImage = <Input type="text" value={this.state.url} onChange={this.handleChangeImage} placeholder="Lien de l'avatar"/>
            inputPassword = <Input
            value={this.state.password}
            onChange={this.handleChangePassword}
            placeholder='Mot de passe'
            type='password'
            />
            inputEmail = <Input
            value={this.state.email}
            onChange={this.handleChangeEmail}
            placeholder='Email'
            type="email"
            required
            />
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
                        <Form onSubmit={this.handleSubmit}>
                        <Title>Modifier le profil</Title>
                            <Input
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            placeholder='Nom'
                            type="text"
                            required
                            />
                            {inputEmail}
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
                            {inputImage}
                            {inputPassword}
                            <Button type='submit'><Text>Modifier</Text></Button>                      
                        </Form>   
                        <RedButton onClick={this.handleDelete}><Text>Supprimer</Text></RedButton>    
                    </ProfileDataContainer>
                </ProfileContainer>
			</Container>
		    </>
        )
    }
}

export default ProfileUpdate