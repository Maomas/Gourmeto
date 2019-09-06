import React, {Component} from "react"
import FloatingButton from './FloatingButton'
import MainTitle from './MainTitle'
import LoginLink from './LoginLink'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import firebase from 'firebase/app'
import base from '../base'
import 'firebase/auth'


const Container = styled.div`
margin-top: 15%;
display: flex;
justify-content:center;
@media (max-width: 768px) {
    flex-direction: column;
  }
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

const InputsContainer = styled.div`
display:flex;
flex-direction:column;
margin-left: 45px;
justify-content:center;`

const LoginContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
margin-left: 20px;
`

const LoginChoiceContainer = styled.div`
display:flex;
justify-content:center;
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
width: 520px;
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

const Error = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #D51515;
border-radius: 4px;
`


class Register extends Component{

    state = {
        goToLogin: false,
        goToHomePage: false,
        currentUser: {},
        email: '',
        name: '',
        city: '',
        url: '',
        uid: '',
        country: '',
        viewsNumber: '',
        likesNumber: '',
        mailErrorCode: null,
        passwordErrorCode: null,
        provider: 'none',
        users: {}
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
        base.syncState('/users', {
			context: this,
			state: 'users'
		})
    }

    handleAuth = async authData => {
        const currentUser = {
            uid: authData.user.uid,
            name: this.state.name,
            email: authData.user.email,
            url: 'https://www.shareicon.net/data/128x128/2016/02/13/718603_people_512x512.png',
            likesNumber: '0',
            viewsNumber: '0',
            country: this.state.country,
            city: this.state.city,
            provider: this.state.provider,
            isAdmin: false
        }
        await base.post(`users/user-${currentUser.uid}/id`,{ data: currentUser.uid})
        await base.post(`users/user-${currentUser.uid}/name`,{ data: currentUser.name})
        await base.post(`users/user-${currentUser.uid}/email`, {data: currentUser.email})
        await base.post(`users/user-${currentUser.uid}/url`,{ data: currentUser.url})
        await base.post(`users/user-${currentUser.uid}/city`,{ data: currentUser.city})
        await base.post(`users/user-${currentUser.uid}/country`,{ data: currentUser.country})
        await base.post(`users/user-${currentUser.uid}/isAdmin`,{ data: currentUser.isAdmin})
        await base.post(`users/user-${currentUser.uid}/likesNumber`,{ data: currentUser.likesNumber})
        await base.post(`users/user-${currentUser.uid}/viewsNumber`,{ data: currentUser.viewsNumber})
        await base.post(`users/user-${currentUser.uid}/provider`,{ data: currentUser.provider})
     }

    goToLogin = event => {
        event.preventDefault()
            this.setState({ goToLogin: true})
    }

    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
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
        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(e => {
            this.setState({goToHomePage: true})
        })
        .catch(error => {
            var errorCode = error.code
            if(errorCode==="auth/email-already-in-use"){
                this.setState({mailErrorCode: "L'adresse mail est déjà utilisée."})
            }
            else if(errorCode==="auth/weak-password"){
                this.setState({passwordErrorCode: "Le mot de passe choisi est trop faible."})
            }
            else{
                this.setState({mailErrorCode: "L'email que vous avez saisi est invalide."})
            }
        });        
    }

    render(){

        let mailError, passwordError;

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }

        if(this.state.goToLogin){
            return <Redirect push to={'/login'}></Redirect>
        }

        mailError = <Error>{this.state.mailErrorCode}</Error>
        passwordError = <Error>{this.state.passwordErrorCode}</Error>

        return(
            <Container>
                <Header>
                    <a href="/"  onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                </Header>
                <MainTitle />
                <InputsContainer>
                    <LoginChoiceContainer>
                        <LoginContainer>
                            <LoginLink contain="S'inscrire" location="register"/>
                        </LoginContainer>
                        <LoginContainer>
                            <LoginLink contain="Se connecter" onClick={this.goToLogin}  location="register"/>
                        </LoginContainer>
                    </LoginChoiceContainer>
                    <Form onSubmit={this.handleSubmit}>
                       <Input
                       onChange={this.handleChangeName}
                       placeholder='Nom complet'
                       type="text"
                       required
                       />
                       <Input
                       onChange={this.handleChangeEmail}
                       placeholder='Email'
                       type="email"
                       required
                       />
                       {mailError}
                       <Input
                       onChange={this.handleChangeCity}
                       placeholder='Ville'
                       type="text"
                       required
                       />
                       <Input
                       onChange={this.handleChangeCountry}
                       placeholder='Pays'
                       type="text"
                       required
                       />
                       <Input
                       onChange={this.handleChangePassword}
                       placeholder='Mot de passe'
                       type='password'
                       required
                       />
                       {passwordError}
                       <Button type='submit'><Text>S'inscrire</Text></Button>
                    </Form>
                </InputsContainer>
            </Container>
        )
    }
    
}

export default Register