import React from "react"
import './Register.css'
import FloatingButton from './FloatingButton'
import MainTitle from './MainTitle'
import LoginLink from './LoginLink'

const Register = () => {

    return(
        <div className="container">
            <FloatingButton>Accueil</FloatingButton>
            <MainTitle />
            <div className="inputsContainer">
                <div className="loginChoiceContainer">
                    <div className="loginContainer">
                        <LoginLink contain="S'inscrire" location="register"/>
                    </div>
                    <div className="loginContainer">
                        <LoginLink contain="Se connecter" location="register"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register