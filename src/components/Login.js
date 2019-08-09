import React from "react"
import './Login.css'
import FloatingButton from './FloatingButton'
import MainTitle from './MainTitle'
import LoginLink from './LoginLink'

const Login = () => {

  return(
       <div className="container">
           <FloatingButton>Accueil</FloatingButton>
           <MainTitle />
           <div className="inputsContainer">
               <div className="loginChoiceContainer">
                   <div className="loginContainer">
                    <LoginLink contain="S'inscrire" location="login"/>
                   </div>
                   <div className="loginContainer">
                       <LoginLink contain="Se connecter" location="login" />
                   </div>
               </div>
               <form className='loginForm'>
                   <input className='formInput'
                   placeholder='Email'
                   type="text"
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

export default Login