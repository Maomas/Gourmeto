import React, {Component} from "react"

import styled from "styled-components"
import FloatingButton from '../components/FloatingButton'
import 'firebase/auth'
import firebase from 'firebase/app'
import {Redirect} from 'react-router-dom'

const Container = styled.div`
margin-top: 15%;
display: flex;
justify-content: center;
align-items: center;
align-content:center;
flex-direction: column;
@media (max-width: 768px) {
    margin-top: 10%;
    padding: 20px;
}`

const Header = styled.div`
margin-top: 69px;
display: flex;
@media (max-width: 768px) {
  margin-top: 29px;
  margin-bottom: 100px;
}`

const SuggestionContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
`

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 64px;
line-height: 75px;
color: #EFEFEFEF;
@media (max-width: 768px) {
    font-size: 32px;
    line-height: 30px;
}`

const Subtitle = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 75px;
color: #EFEFEFEF;
@media (max-width: 768px) {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 30px;
}`

const TitleContainer = styled.div`
display:flex;
flex-direction:column;
`

const Form = styled.form`
display: flex;
flex-direction:column;
`

const Highlighting = styled.div`
background: #EFEFEFEF;
border-radius: 12.069px;
height: 12px;
@media (max-width: 768px) {
    height: 6px;
}
`

const Image = styled.div`
height: 360px;
border-radius: 10.6303px;
border: 1px solid black;
background-size: cover;
margin-top:50px;
@media (max-width: 768px) {
    height: 120px;
    margin-top: 20px;
    margin-bottom: 50px;
}`

const Input = styled.input`
height: 79px;
background: #EFEFEF;
padding: 10px;
border-radius: 219.444px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
color: #000000;
@media (max-width: 768px) {
    font-size: 14px;
    line-height: 10px;
    height: 30px;
    margin-bottom: 20px;
}`

const Text = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 40px;
line-height: 75px;
color: #EFEFEFEF;
@media (max-width: 768px) {
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 5px;
}
`

const Button = styled.button`
cursor:pointer;
display: flex;
justify-content: center;
align-items: center;
height: 90px;
background: #C4C4C4;
mix-blend-mode: hard-light;
border: 1.0022px solid #FFFFFF;
backdrop-filter: blur(4.00879px);
border-radius: 7.40084px;
margin-top:30px;
margin-bottom: 100px;
@media (max-width: 768px) {
    height: 45px;
}
`

class Suggestion extends Component {

 componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.handleAuth({ user })
        }
    })
}

handleAuth = async authData => {
    const currentUser = {
        uid: authData.user.uid,
        name: authData.user.displayName,
        email: authData.user.email,
        url: authData.user.photoURL,
    }
    this.setState({currentUser: currentUser})
  }

state = {
    name: '',
    url: '',
    city: '',
    country: '',
    goToHomePage: false,
    currentUser: {}
}

handleChangeUrl = event => {
    const url = event.target.value
    this.setState({ url })
}

handleChangeName = event => {
    const name = event.target.value
    this.setState({ name })
}

handleChangeCity = event => {
    const city = event.target.value
    this.setState({ city })
}

handleChangeCountry = event => {
    const country = event.target.value
    this.setState({ country })
}

handleSubmit = event => {
    event.preventDefault()  
    firebase.database().ref('suggestions/suggestion-' + Date.now()).set({
        name: this.state.name,
        url: this.state.url,
        city: this.state.city,
        country: this.state.country,
        uid: this.state.currentUser.uid
      });
    this.setState({goToHomePage: true})
}


render(){

    let image;

    if(this.state.goToHomePage){
        return <Redirect push to={'/'}></Redirect>
    }

    if(this.state.url){
        image = <Image style={{ backgroundImage: `url(${this.state.url})`, backgroundColor: "white" }}  />
    }
    else{
        image = <Image style={{ backgroundImage: `url(${this.state.url})`, backgroundColor: "white" }}  />
    }
    return(
        <Container>
            <Header>
                <a href="/"  onClick={this.goToHomePage} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Accueil</FloatingButton></a>
            </Header>
            <SuggestionContainer>
                <TitleContainer>
                    <Title>Faire une suggestion</Title>
                    <Subtitle>Veuillez remplir les différentes informations à envoyer à l'administrateur.</Subtitle>
                    <Highlighting />
                </TitleContainer>
                <Form onSubmit={this.handleSubmit}>
                    {image}
                    <Text>Nom du lieu</Text>
                    <Input
                        value={this.state.name}
                        onChange={this.handleChangeName}
                        type="text"
                        required
                    />
                    <Text>Url de l'image du lieu</Text>
                    <Input
                        value={this.state.url}
                        onChange={this.handleChangeUrl}
                        placeholder="Copier l'adresse d'une image du lieu en ligne et coller-la dans ce champ."
                        type="text"
                        required
                    />
                    <Text>Ville</Text>
                    <Input
                        value={this.state.city}
                        onChange={this.handleChangeCity}
                        placeholder=""
                        type="text"
                        required
                    />
                    <Text>Pays</Text>
                    <Input
                        value={this.state.country}
                        onChange={this.handleChangeCountry}
                        placeholder=""
                        type="text"
                        required
                    />
                <Button type='submit'><Text>Envoyer</Text></Button>
                </Form>
            </SuggestionContainer>
        </Container>
    )
}
}

export default Suggestion