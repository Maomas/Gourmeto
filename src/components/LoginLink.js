import React from "react"
import './LoginLink.css'

const LoginLink = ({contain, location, onClick}) => {
    if(contain === 'S\'inscrire' && location === "register"){
        return(
            <>
                <div className="loginContainer">
                    <div className="textSubscriptionWrapper">
                        <a href="/register" onClick={onClick} style={{ textDecoration: 'none', color: '#EFEFEF' }}>{contain}</a>
                    </div>
                    <div className="highlighting" />
                </div>
                
            </>
        )
    }
    else if(contain === 'Se connecter' && location === "register"){
        return(
            <>
                <div className="loginContainer">
                    <div className="textLoginWrapper">
                        <a href="/login" onClick={onClick} style={{ textDecoration: 'none', color:'#EFEFEF' }}>{contain}</a>
                    </div>
                    <div className="transparentHighlighting" />
                </div>
            </>
        )
    }
    else if(contain === 'S\'inscrire' && location === "login"){
        return(
            <>
                <div className="loginContainer">
                    <div className="textLoginWrapper">
                    <a href="/register" onClick={onClick} style={{ textDecoration: 'none', color: '#EFEFEF' }}>{contain}</a>
                    </div>
                    <div className="transparentHighlighting" />
                </div>
            </>
        )
    }
    else{
        return(
            <>
                <div className="loginContainer">
                    <div className="textLoginWrapper">
                        <a href="/login" onClick={onClick} style={{ textDecoration: 'none', color: '#EFEFEF' }}>{contain}</a>
                    </div>
                    <div className="highlightingTwo" />
                </div>
            </>
        )
    }


        
}

export default LoginLink;