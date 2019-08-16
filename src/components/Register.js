import React, {Component} from "react"
import FloatingButton from './FloatingButton'
import MainTitle from './MainTitle'
import LoginLink from './LoginLink'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import firebase from 'firebase/app'
import base, {firebaseApp} from '../base'
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


class Register extends Component{


    state = {
        goToRegister: false,
        goToHomePage: false,
        email: '',
        name: '',
        city: 'Mons',
        url: '',
        country: 'Belgique',
        viewsNumber: '',
        likesNumber: '',
        uid:''
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
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    }

    handleAuth = async authData => {
        this.setState({uid: authData.user.uid})
        await base.post(`users/user-${this.state.uid}/name`, { data: this.state.name})
        await base.post(`users/user-${this.state.uid}/email`, { data: this.state.email})
        await base.post(`users/user-${this.state.uid}/url`,{ data: this.state.url})
        await base.post(`users/user-${this.state.uid}/country`,{ data: this.state.country})
        await base.post(`users/user-${this.state.uid}/city`,{ data: this.state.city})
        await base.post(`users/user-${this.state.uid}/viewsNumber`,{ data: this.state.viewsNumber})
        await base.post(`users/user-${this.state.uid}/likesNumber`,{ data: this.state.likesNumber})
        this.setState({ goToHomePage: true})

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }    
                  
        })
           
    }
    

    render(){

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }

        if(this.state.goToLogin){
            return <Redirect push to={'/login'}></Redirect>
        }

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
                       <Button type='submit'><Text>S'inscrire</Text></Button>
                    </Form>
                </InputsContainer>
            </Container>
        )
    }
    
}

export default Register