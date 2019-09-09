import React from "react"
import styled from "styled-components"

const TextSubscriptionWrapper = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 35.8333px;
line-height: 42px;
display:flex;
justify-content: center;
align-items:center;
color: #FFFFFF;
width: 142px;
height: 43px;
cursor:pointer;
@media (max-width: 768px) {
    font-size: 15px;
    line-height: 18px;
    height: 20px;
}
`

const TextLoginWrapper = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 35.8333px;
line-height: 42px;
display:flex;
justify-content: center;
align-items:center;
color: #FFFFFF;
width: 210.22px;
height: 43px;
cursor:pointer;
@media (max-width: 768px) {
    font-size: 15px;
    line-height: 18px;
    height: 20px;
}
`

const Highlighting = styled.div`
background: #C4C4C4;
border-radius: 12.069px;
width: 146px;
height: 12px;
@media (max-width: 768px){
    width: 62px;
    height: 5px;
}
`

const HighlightingTwo = styled.div`
background: #C4C4C4;
border-radius: 12.069px;
width: 210px;
height: 12.07px;
@media (max-width: 768px){
    width: 87px;
    height: 5px;
}
`

const TransparentHighlighting = styled.div`
background: #C4C4C4;
border-radius: 12.069px;
width: 146px;
height: 12px;
visibility: hidden;
@media (max-width: 768px){
    width: 87px;
    height: 5px;
}
`

const LoginContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
@media (max-width: 768px){
    align-items:center;
}
`

const LoginLink = ({contain, location, onClick}) => {
    if(contain === 'S\'inscrire' && location === "register"){
        return(
            <>
                <LoginContainer>
                    <TextSubscriptionWrapper>
                        <a href="/register" onClick={onClick} style={{ textDecoration: 'none', color: '#EFEFEF' }}>{contain}</a>
                    </TextSubscriptionWrapper>
                    <Highlighting />
                </LoginContainer>
                
            </>
        )
    }
    else if(contain === 'Se connecter' && location === "register"){
        return(
            <>
                <LoginContainer>
                    <TextLoginWrapper>
                        <a href="/login" onClick={onClick} style={{ textDecoration: 'none', color:'#EFEFEF' }}>{contain}</a>
                    </TextLoginWrapper>
                    <TransparentHighlighting />
                </LoginContainer>
            </>
        )
    }
    else if(contain === 'S\'inscrire' && location === "login"){
        return(
            <>
                <LoginContainer>
                    <TextLoginWrapper>
                    <a href="/register" onClick={onClick} style={{ textDecoration: 'none', color: '#EFEFEF' }}>{contain}</a>
                    </TextLoginWrapper>
                    <TransparentHighlighting />
                </LoginContainer>
            </>
        )
    }
    else{
        return(
            <>
                <LoginContainer>
                    <TextLoginWrapper>
                        <a href="/login" onClick={onClick} style={{ textDecoration: 'none', color: '#EFEFEF' }}>{contain}</a>
                    </TextLoginWrapper>
                    <HighlightingTwo />
                </LoginContainer>
            </>
        )
    }


        
}

export default LoginLink;