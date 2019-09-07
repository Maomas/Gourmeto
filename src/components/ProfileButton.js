import React from "react"
import styled from 'styled-components'

const ButtonWrapper = styled.div`
display: flex;
background: #C4C4C4;
mix-blend-mode: hard-light;
border: 1.0022px solid #FFFFFF;
backdrop-filter: blur(4.00879px);
justify-content:center;
border-radius: 7.40084px;
padding:15px;
margin-top:20px;
cursor:pointer;
@media (max-width: 768px){
    width: 220px;
    padding: 5px;
}`

const TextWrapper = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3912px;
line-height: 31px;
color: #000000;
@media (max-width: 768px){
    font-size: 12.56px;
    line-height: 15px;
}`


export const ProfileButton = ({contain}) => {
    return (
        <ButtonWrapper>
           <TextWrapper>{contain}</TextWrapper> 
        </ButtonWrapper>
    )
} 