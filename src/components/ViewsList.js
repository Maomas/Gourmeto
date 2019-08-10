import React from "react"
import styled from 'styled-components'
import ViewBoard from './ViewBoard'

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 51.6px;
line-height: 60px;
margin-top: 200px;
color: #EFEFEF;
margin-bottom: 20px;`


const ViewsListWrapper = styled.div`
display:flex;
flex-direction:column;`

export const ViewsList = () => {

    return (
        <>
        <ViewsListWrapper>
            <Title>Avis</Title>
            <ViewBoard />
        </ViewsListWrapper>
           
        </>
    )
} 