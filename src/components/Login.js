import React, {Component} from "react"
import './Login.css'
import FloatingButton from './FloatingButton'
import MainTitle from './MainTitle'
import LoginLink from './LoginLink'
import { Redirect } from 'react-router-dom'

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
            <div className="container">
                <a href="/" onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                <MainTitle />
                <div className="inputsContainer">
                    <div className="loginChoiceContainer">
                        <div className="loginContainer">
                            <LoginLink onClick={this.goToRegister} contain="S'inscrire" location="login"/>
                        </div>
                        <div className="loginContainer">
                            <LoginLink contain="Se connecter" location="login" />
                        </div>
                    </div>
                    <form className='loginForm' onSubmit={this.goToHomePage}>
                        <input className='formInput'
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder='Email'
                        type="email"
                        required
                        />
                        <input className='formInput'
                        placeholder='Password'
                        type='password'
                        required
                        />
                        <button type='submit'><span className="textButton">Se connecter</span></button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login