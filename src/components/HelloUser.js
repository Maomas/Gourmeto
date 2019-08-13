import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 31px;
color: #FFFFFF;
border-radius: 4px;
margin-right: 10px;
`

const HelloUser = ({pseudo}) => {

    return(
       <Text>Bonjour, {pseudo}</Text> 
    )

}

export default HelloUser