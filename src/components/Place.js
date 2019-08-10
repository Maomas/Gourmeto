import React, {Component} from "react"
import styled from "styled-components"
import background from '../images/background.jpg'
import FloatingButton from "../components/FloatingButton"
import {Redirect} from 'react-router-dom'
import { ViewsNumber } from "./ViewsNumber"
import { ProfileButton } from "./ProfileButton"
import { ViewsList } from "./ViewsList"
import ViewForm from "./ViewForm";


const Container = styled.div`
height:1800px;
display: flex;
justify-content: center;
align-items: center;
align-content:center;
flex-direction: column;
background: url(${background});
background-size: cover;
box-shadow: inset 0px 10px 250px #000000;
`

const PlaceContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
`

const PlaceDataContainer = styled.div`
diplay:flex;
margin-left: 10px;
align-content:space-between;
`

const Image = styled.div`
width: 360px;
height: 360px;
border-radius: 10.6303px;
border: 1px solid black;
background-size: cover;`

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 64px;
line-height: 75px;
color: #EFEFEFEF;`

const PlaceWrapper = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 37px;
color: #EFEFEF;`

class Place extends Component{

    state = {
        goToHomePage: false,
        id: this.props.match.params.id,
        name: 'La Lorgnette',
        city: 'Mons',
        country: 'Belgique',
        viewsNumber: '5',
        views: {}
    }

    addView = view => {
        const views = {...this.state.views}
        views[`view-${Date.now()}`] = view
        this.setState({views})
    }

    goToHomePage = event => {
        event.preventDefault()
        this.setState({ goToHomePage: true})
    }

    render(){

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }

        return(
        <>
            <Container>
                <a href="/"  onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                <PlaceContainer>
                    <Image />
                    <PlaceDataContainer>
                        <Title>{this.state.name}</Title>
                        <PlaceWrapper>{this.state.city}, {this.state.country}</PlaceWrapper>
                        <ViewsNumber viewsNumber={this.state.viewsNumber}/>
                        <ProfileButton contain="Donner son avis" />
                    </PlaceDataContainer>
                </PlaceContainer>   
                <ViewForm addView={this.addView} id={this.state.id}/>
                <ViewsList />        
            </Container>
        </>
        )
    }
}

export default Place