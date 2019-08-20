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
        provider: 'none'
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
    }

    handleAuth = async authData => {
        const currentUser = {
            uid: authData.user.uid,
            name: this.state.name,
            email: authData.user.email,
            url: 'data:image/png;base64,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',
            likesNumber: '0',
            viewsNumber: '0',
            country: this.state.country,
            city: this.state.city,
            provider: this.state.provider
        }
        base.post(`users/user-${currentUser.uid}/name`,{ data: currentUser.name})
        base.post(`users/user-${currentUser.uid}/email`, {data: currentUser.email})
        base.post(`users/user-${currentUser.uid}/url`,{ data: currentUser.url})
        base.post(`users/user-${currentUser.uid}/city`,{ data: currentUser.city})
        base.post(`users/user-${currentUser.uid}/country`,{ data: currentUser.country})
        base.post(`users/user-${currentUser.uid}/likesNumber`,{ data: currentUser.likesNumber})
        base.post(`users/user-${currentUser.uid}/viewsNumber`,{ data: currentUser.viewsNumber})
        base.post(`users/user-${currentUser.uid}/provider`,{ data: currentUser.provider})
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
            console.log('errorCode :' +errorCode)
            console.log(JSON.stringify(errorCode))
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