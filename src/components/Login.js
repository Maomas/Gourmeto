import React, {Component} from "react"
import FloatingButton from './FloatingButton'
import MainTitle from './MainTitle'
import LoginLink from './LoginLink'
import { Redirect } from 'react-router-dom'
import styled from "styled-components"
import googleBrand from "../images/google-brands.svg"
import facebookBrand from "../images/facebook-brands.svg"
import SpecialButton from './SpecialButton'
import firebase from 'firebase/app'
import base, {firebaseApp} from '../base'
import 'firebase/auth'

const Container = styled.div`
margin-top: 15%;
display: flex;
justify-content:center;
`

const InputsContainer = styled.div`
display:flex;
flex-direction:column;
margin-left: 45px;
justify-content:center;
`

const LoginContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
margin-left: 35px;
`

const LoginChoiceContainer = styled.div`
display:flex;
`

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

const Header = styled.div`
position: absolute;
left: 80%;
top: 69px;
width: 600px;
display: flex;
justify-content:center;
align-items: center;
`

class Login extends Component {


    state = {
        goToHomePage: false,
        goToRegister: false,
        isAdmin: false,
        currentUser: {},
        email: '',
        password: '',
        provider: ''
    }

    /*componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
    }*/

    handleAuth = async authData => {
        const currentUser = {
            uid: authData.user.uid,
            name: authData.user.displayName,
            email: authData.user.email,
            url: authData.user.photoURL,
            likesNumber: '0',
            viewsNumber: '0',
            country: '',
            city: '',
            provider: this.state.provider,

        }
        this.setState({currentUser: currentUser})
        await base.post(`users/user-${this.state.currentUser.uid}/name`,{ data: this.state.currentUser.name})
        await base.post(`users/user-${this.state.currentUser.uid}/email`, {data: this.state.currentUser.email})
        await base.post(`users/user-${this.state.currentUser.uid}/url`,{ data: this.state.currentUser.url})
        await base.post(`users/user-${this.state.currentUser.uid}/likesNumber`,{ data: this.state.currentUser.likesNumber})
        await base.post(`users/user-${this.state.currentUser.uid}/viewsNumber`,{ data: this.state.currentUser.viewsNumber})
        await base.post(`users/user-${this.state.currentUser.uid}/country`, { data: this.state.currentUser.country})
        await base.post(`users/user-${this.state.currentUser.uid}/city`, { data: this.state.currentUser.city})
        await base.post(`users/user-${this.state.currentUser.uid}/provider`,{ data: this.state.currentUser.provider})
     }

    authenticateGoogle = () => {
        const authProviderGoogle = new firebase.auth.GoogleAuthProvider()
        this.setState({provider: 'google'})
        firebaseApp
        .auth()
        .signInWithPopup(authProviderGoogle)
        .then(this.handleAuth)
    }

    authenticateFacebook = () => {
        const authProviderFacebook = new firebase.auth.FacebookAuthProvider()
        this.setState({provider: 'facebook'})
        firebaseApp
        .auth()
        .signInWithPopup(authProviderFacebook)
        .then(this.handleAuth)
    }

    handleChangeEmail = event => {
        const email = event.target.value
        this.setState({email})
    }

    handleChangePassword = event => {
        const password = event.target.value
        this.setState({password})
    }

    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
    }

    goToRegister = event => {
        event.preventDefault()
        this.setState({ goToRegister: true})
    }

    handleSubmit = event => {
        event.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            var errorCode = error.code
            console.log(errorCode)
            var errorMessage = error.message;
            console.log(errorMessage)
          });
          this.setState({goToHomePage: true})
    }

    render(){

        if(this.state.goToHomePage){
            return <Redirect to={'/'}></Redirect>
        }
        if(this.state.goToRegister){
            return <Redirect to={'/register'}></Redirect>
        }

        if(this.state.currentUser.uid){
            return <Redirect to={'/'}></Redirect>
        }

        return(
            <Container>
                <Header>
                    <a href="/" onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                </Header>
                <MainTitle />
                <InputsContainer>
                    <LoginChoiceContainer>
                        <LoginContainer>
                            <LoginLink push onClick={this.goToRegister} contain="S'inscrire" location="login"/>
                        </LoginContainer>
                        <LoginContainer>
                            <LoginLink push contain="Se connecter" location="login" />
                        </LoginContainer>
                    </LoginChoiceContainer>
                    <Form onSubmit={this.handleSubmit}>
                        <Input
                        onChange={this.handleChangeEmail}
                        placeholder='Email'
                        type="email"
                        required
                        />
                        <Input
                        onChange={this.handleChangePassword}
                        placeholder='Mot de passe'
                        type="password"
                        required
                        />
                        <Button type='submit'><Text>Se connecter</Text></Button>                       
                    </Form>                        
                    <SpecialButton contain="Connectez-vous avec Google" onClick={this.authenticateGoogle} icon={googleBrand}/>
                    <SpecialButton onClick={this.authenticateFacebook} contain="Connectez-vous avec Facebook" icon={facebookBrand}/>
                </InputsContainer>
            </Container>
        )
    }
}

export default Login