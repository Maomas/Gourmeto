import React from "react"
import styled from 'styled-components'

const Button = styled.div`
cursor:pointer;
display: flex;
align-items: center;
width: 519.5px;
height: 58.85px;
background: #C4C4C4;
mix-blend-mode: hard-light;
border: 1.0022px solid #FFFFFF;
backdrop-filter: blur(4.00879px);
border-radius: 7.40084px;
margin-top:30px;
@media (max-width: 768px){
    width: 236px;
    height: 28px;
}
`
const Text = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #FFFFFF;
border-radius: 4px;
margin-left: 60px;
@media (max-width: 768px){
    font-size: 12.5571px;
    line-height: 15px;
    margin-left: 45px;
}
`

const Icon = styled.div`
width: 45px;
height: 50px;
margin-left: 5px;
@media (max-width: 768px){
    width: 20px;
    height: 20px;
}
`

const SpecialButton = ({contain, link, icon, onClick}) => {
    return(
        <>
         <a href={link} style={{ textDecoration: 'none', color:'#EFEFEF' }}><Button onClick={onClick}><Icon><img src={icon} alt=""></img></Icon><Text>{contain}</Text></Button></a>        
        </>
    )
}

export default SpecialButton