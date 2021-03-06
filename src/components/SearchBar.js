import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
background: #EFEFEF;
border-radius: 10px;
width: 673px;
height: 79px;
padding: 10px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #000000;
position:relative;
@media (max-width: 768px) {
    width: 276px;
    height: 36px;
    font-size: 12px;
    line-height: 14px;
}
`

const SearchBar = ({onChange, onFocus, onBlur}) => {
    return(
        <>
           <Input onChange={onChange} onFocus={onFocus} onBlur={onBlur} placeholder="Rechercher un restaurant, un café,..."/>
        </>
    )
}

export default SearchBar