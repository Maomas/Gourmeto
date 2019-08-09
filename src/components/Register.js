import React, {Component} from "react"
import './Register.css'
import FloatingButton from './FloatingButton'
import MainTitle from './MainTitle'
import LoginLink from './LoginLink'
import {Redirect} from 'react-router-dom'

class Register extends Component{

    state = {
        goToRegister: false,
        goToHomePage: false
    }

    goToLogin = event => {
        event.preventDefault()
            this.setState({ goToLogin: true})
    }

    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
    }
    

    render(){

        if(this.state.goToHomePage){
            return <Redirect to={'/'}></Redirect>
        }

        if(this.state.goToLogin){
            return <Redirect to={'/login'}></Redirect>
        }

        return(
            <div className="container">
                <a href="/"  onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                <MainTitle />
                <div className="inputsContainer">
                    <div className="loginChoiceContainer">
                        <div className="loginContainer">
                            <LoginLink contain="S'inscrire" location="register"/>
                        </div>
                        <div className="loginContainer">
                            <LoginLink contain="Se connecter" onClick={this.goToLogin}  location="register"/>
                        </div>
                    </div>
                    <form className='loginForm' onSubmit={this.goToHomePage}>
                       <input className='formInput'
                       placeholder='Pseudo'
                       type="text"
                       required
                       />
                       <input className='formInput'
                       placeholder='Nom complet'
                       type="text"
                       required
                       />
                       <input className='formInput'
                       placeholder='Email'
                       type="email"
                       required
                       />
                       <input className='formInput'
                       placeholder='Ville'
                       type="text"
                       required
                       />
                       <input className='formInput'
                       placeholder='Pays'
                       type="text"
                       required
                       />
                       <input className='formInput'
                       placeholder='Mot de passe'
                       type='password'
                       required
                       />
                       <button type='submit'><span className="textButton">S'inscrire</span></button>
                   </form>
                </div>
            </div>
        )
    }
    
}

export default Register