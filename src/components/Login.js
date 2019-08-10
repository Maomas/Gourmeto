import React, {Component} from "react"
import FloatingButton from './FloatingButton'
import MainTitle from './MainTitle'
import LoginLink from './LoginLink'
import { Redirect } from 'react-router-dom'
import styled from "styled-components"
import background from '../images/background.jpg'
import googleBrand from "../images/google-brands.svg"
import facebookBrand from "../images/facebook-brands.svg"
import SpecialButton from './SpecialButton'

const Container = styled.div`
height:1500px;
display: flex;
background: url(${background});
background-size: cover;
box-shadow: inset 0px 10px 250px #000000;
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

class Login extends Component {
    state = {
        email: '',
        goToHomePage: false,
        goToRegister: false
    }

    handleChange = event => {
        const email = event.target.value
        this.setState({email})
    }

    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
    }

    goToRegister = event => {
        event.preventDefault()
        this.setState({ goToRegister: true})
    }

    render(){

        if(this.state.goToHomePage){
            return <Redirect to={'/'}></Redirect>
        }
        if(this.state.goToRegister){
            return <Redirect to={'/register'}></Redirect>
        }

        return(
            <Container>
                <a href="/" onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
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
                    <Form onSubmit={this.goToHomePage}>
                        <Input
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder='Email'
                        type="email"
                        required
                        />
                        <Input
                        placeholder='Mot de passe'
                        type='password'
                        required
                        />
                        <Button type='submit'><Text>Se connecter</Text></Button>
                    </Form>
                    <SpecialButton contain="Connectez-vous avec Google" icon={googleBrand}/>
                    <SpecialButton contain="Connectez-vous avec Facebook" icon={facebookBrand}/>
                </InputsContainer>
            </Container>
        )
    }
}

export default Login