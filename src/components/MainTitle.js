import React from "react"
import styled from 'styled-components'


const Text = styled.div`
font-family: 'Satisfy';
font-style: normal;
font-weight: normal;
font-size: 148.396px;
line-height: 214px;
color: #EFEFEF;
display:flex;
justify-content: center;
align-items:center;
@media (max-width: 768px) {
  width: 235px;
  height: 91px;
  font-size: 64px;
  line-height: 92px;
}
`

const MainTitle = () => {
    return(
        <>
          <Text>Gourmeto</Text>
        </>
    )
}

export default MainTitle