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
margin-top: 20px;
display: flex;
justify-content:center;
flex-direction:column;
align-tems:center;
margin-bottom: 200px;
@media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
}`

const SecondContainer = styled.div`
margin-top: 15%;
display: flex;
justify-content:center;
@media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
}
`

const InputsContainer = styled.div`
display:flex;
flex-direction:column;
margin-left: 45px;
justify-content:center;
align-items:center;
@media (max-width: 468px){
    margin-left: 0px;
}
`

const LoginContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

const LoginChoiceContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
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
@media (max-width: 768px) {
    width: 238.5px;
    height: 36px;
    font-size: 12px;
    line-height: 14px;
     padding: 2px;
}
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
margin-top:30px;
@media (max-width: 768px){
    width: 236px;
    height: 28px;
}`
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
}`

const Header = styled.div`
margin-top: 69px;
display: flex;
justify-content:center;
align-tems:center;
@media (max-width: 768px) {
  margin-top: 29px;
}
`

const Error = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #D51515;
border-radius: 4px;
@media (max-width: 768px){
    font-size: 12.5571px;
    line-height: 15px;
}
`

class Login extends Component {


    state = {
        goToHomePage: false,
        goToRegister: false,
        currentUser: {},
        email: '',
        password: '',
        provider: '',
        errorCode: null,
        users: {},
        isAdmin: false
    }

    componentDidMount(){
        base.syncState('/users', {
			context: this,
			state: 'users'
        })
        if(this.state.currentUser.email==="samahaux98@gmail.com"){
            this.setState({isAdmin: true})
        }
    }


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
            provider: this.state.provider
        }
        this.setState({currentUser: currentUser})

        await firebase.database().ref(`users/user-${this.state.currentUser.uid}`).on("value", snapshot => {
            if (snapshot.val()){
                base.syncState(`/users/user-${this.state.currentUser.uid}`, {
                    context: this,
                    state: 'currentUser'
                })
            }
            else{
                if(this.state.currentUser.email==="samahaux98@gmail.com"){
                firebase.database().ref('users/user-' + this.state.currentUser.uid).set({
                    id: this.state.currentUser.uid,
                    email: this.state.currentUser.email,
                    name : this.state.currentUser.name,
                    url: this.state.currentUser.url,
                    likesNumber: this.state.currentUser.likesNumber,
                    viewsNumber: this.state.currentUser.viewsNumber,
                    country: this.state.currentUser.country,
                    city: this.state.currentUser.city,
                    provider: this.state.currentUser.provider,
                    isAdmin: true
                });
                } else{
                    firebase.database().ref('users/user-' + this.state.currentUser.uid).set({
                        id: this.state.currentUser.uid,
                        email: this.state.currentUser.email,
                        name : this.state.currentUser.name,
                        url: this.state.currentUser.url,
                        likesNumber: this.state.currentUser.likesNumber,
                        viewsNumber: this.state.currentUser.viewsNumber,
                        country: this.state.currentUser.country,
                        city: this.state.currentUser.city,
                        provider: this.state.currentUser.provider,
                        isAdmin: false
                    });
                }
            }
         });
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
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(e => {
            this.setState({goToHomePage: true})
            base.syncState(`/user/${this.state.currentUser.uid}`, {
                context: this,
                state: 'currentUser'
            })
        })
        .catch(error => {
            var errorCode = error.code
            if(errorCode==="auth/user-not-found"){
                this.setState({errorCode: "Aucun utilisateur ne possède cette adresse email."})
            }
            else{
                this.setState({errorCode: "Le mot de passe que vous avez rentré est incorrect."})
            }
          });
    }

    render(){
        let error;
       

        if(this.state.goToHomePage){
            return <Redirect to={'/'}></Redirect>
        }

        if(this.state.goToRegister){
            return <Redirect to={'/register'}></Redirect>
        }

        if(this.state.currentUser.uid){
            return <Redirect to={'/'}></Redirect>
        }
        error = <Error>{this.state.errorCode}</Error>
        

        return(
            <Container>
                <Header>
                    <a href="/" onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                </Header>
                <SecondContainer>
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
                        {error}
                        <Button type='submit'><Text>Se connecter</Text></Button>                       
                    </Form>                        
                    <SpecialButton contain="Connectez-vous avec Google" onClick={this.authenticateGoogle} icon={googleBrand}/>
                    <SpecialButton onClick={this.authenticateFacebook} contain="Connectez-vous avec Facebook" icon={facebookBrand}/>
                </InputsContainer>
                </SecondContainer>
            </Container>
        )
    }
}

export default Login