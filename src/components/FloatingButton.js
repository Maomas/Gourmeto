import React from "react"
import styled from 'styled-components'

const Button = styled.div`
margin-right: 20px;
width: 197px;
height: 67px;
cursor:pointer;
display: flex;
justify-content: center;
align-items: center;
background: #C4C4C4;
mix-blend-mode: hard-light;
border: 1px solid #FFFFFF;
backdrop-filter: blur(4px);
border-radius: 4px;
margin-bottom: 10px;
@media (max-width: 768px) {
    width: 120px;
    height: 28.13px;
    margin-right: 10px;
  }
`

const Text = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #FFFFFF;
border-radius: 4px;
@media (max-width: 768px) {
    font-size: 15px;
}
`



const FloatingButton = ({children, onClick}) => {
    return(
        <>           
            <Button onClick={onClick}><Text className="text">{children}</Text></Button>          
        </>
    )
}

export default FloatingButton;