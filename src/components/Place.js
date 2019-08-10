import React, {Component} from "react"
import styled from "styled-components"
import background from '../images/background.jpg'
import FloatingButton from "../components/FloatingButton"
import {Redirect} from 'react-router-dom'
import { ViewsNumber } from "./ViewsNumber"
import { ProfileButton } from "./ProfileButton"
import ViewForm from "./ViewForm"
import ViewBoard from "./ViewBoard";


const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
align-content:center;
flex-direction: column;
background: url(${background});
background-size: fixed;
box-shadow: inset 0px 10px 250px #000000;
`

const PlaceContainer = styled.div`
margin-top: 300px;
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

const ListTitle = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 51.6px;
line-height: 60px;
margin-top: 200px;
color: #EFEFEF;
margin-bottom: 20px;`


const ViewsList = styled.div`
display:flex;
flex-direction:column;`

class Place extends Component{

    state = {
        goToHomePage: false,
        id: this.props.match.params.id,
        place: 'La Lorgnette',
        city: 'Mons',
        url: 'https://s3-media2.fl.yelpcdn.com/bphoto/Or501eN94R3wyOXfvdXxbQ/ls.jpg',
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

        const views = Object.keys(this.state.views)
        .map(key => (
            <ViewBoard
                key={key}
                id={this.state.views[key].id}
                name='William Dupont'
                time='0 minutes'
                place={this.state.views[key].place}
                description={this.state.views[key].view}
                url={this.state.views[key].url}
            />
        ))

        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }

        return(
        <>
            <Container>
                <a href="/" onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
                <PlaceContainer>
                    <Image style={{ backgroundImage: `url(${this.state.url})` }} />
                    <PlaceDataContainer>
                        <Title>{this.state.place}</Title>
                        <PlaceWrapper>{this.state.city}, {this.state.country}</PlaceWrapper>
                        <ViewsNumber viewsNumber={this.state.viewsNumber}/>
                        <ProfileButton contain="Donner son avis" />
                    </PlaceDataContainer>
                </PlaceContainer>   
                <ViewForm length={340} addView={this.addView} id={this.state.id} place={this.state.place} url={this.state.url}/>  
                 <ViewsList>
                    <ListTitle>Avis</ListTitle>
                    { views }
                 </ViewsList>
            </Container>
        </>
        )
    }
}

export default Place