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
`

const Highlighting = styled.div`
background: #C4C4C4;
border-radius: 12.069px;
width: 146px;
height: 12px;
`

const HighlightingTwo = styled.div`
background: #C4C4C4;
border-radius: 12.069px;
width: 210px;
height: 12.07px;
`

const TransparentHighlighting = styled.div`
background: #C4C4C4;
border-radius: 12.069px;
width: 146px;
height: 12px;
visibility: hidden;
`

const LoginContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
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