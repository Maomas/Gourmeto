import React from "react"
import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  body {
    @import url('//fonts.googleapis.com/css?family=Satisfy');
    font-family: 'Satisfy', sans-serif;
  }
`

const Text = styled.div`
font-family: Satisfy;
font-style: normal;
font-weight: normal;
font-size: 148.396px;
line-height: 214px;
color: #EFEFEF;
display:flex;
justify-content: center;
align-items:center;
`

const MainTitle = () => {
    return(
        <>
            <GlobalStyles />
            <Text>Gourmeto</Text>
        </>
    )
}

export default MainTitle