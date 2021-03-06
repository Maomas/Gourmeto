import React, {Component} from "react"
import styled from 'styled-components'
import 'firebase/auth'
import 'react-confirm-alert/src/react-confirm-alert.css'
import firebase from 'firebase/app'

const Container = styled.div`
display: flex;
flex-direction:column;
padding:15px;
width: 555px;
height: 450px;
background: #EFEFEF;
border-radius: 5px;
margin-top:20px;
word-wrap: break-word;
justify-content:center;
@media (max-width: 768px) {
	width: 266.86px;
	height: 250px;
}`

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 75px;
color: #000000;
@media (max-width: 768px) {
	font-size: 20px;
}`

const SpaceBetween = styled.div`
width: 20px;
`

const Form = styled.form`
display: flex;
flex-direction:column;
`

const Input = styled.textarea`
resize: none;
border-radius: 5px;
font-family: Roboto;
height:40px;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
padding: 10px;
color: #000000;
@media (max-width: 768px) {
    height: 10px;
    font-size: 15px;
    line-height: 10px;
    margin-bottom: 1px;
}
`

const Button = styled.button`
display: flex;
background: #C4C4C4;
mix-blend-mode: hard-light;
border: 1.0022px solid #FFFFFF;
backdrop-filter: blur(4.00879px);
justify-content:center;
border-radius: 7.40084px;
padding:15px;
margin-top:20px;
cursor:pointer;
@media (max-width: 768px) {
    margin-top: 5px;
    height: 20px;
}
`

const Text = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3912px;
line-height: 31px;
color: #000000;
@media (max-width: 768px) {
    font-size: 15px;
    line-height:5px;
}`

class PlaceForm extends Component {


    state = {
        country: '',
        city: '',
        name: '',
        url :'',
        viewsNumber: '0',
        urlSite: ''
    }


    handleSubmit = event => {
        event.preventDefault()
        firebase.database().ref('places/place-' + Date.now()).set({
            country: this.state.country,
            city: this.state.city,
            name: this.state.name,
            url: this.state.url,
            urlSite: this.state.urlSite,
            viewsNumber: this.state.viewsNumber
          });
        this.setState({
            country: '',
            name: '',
            city: '',
            url: '',
            urlSite: ''
        })
    }

    handleChangeCountry = event => {
        const country = event.target.value
        this.setState({ country })
    }

    handleChangeCity = event => {
        const city = event.target.value
        this.setState({ city })
    }

    handleChangeName = event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeUrl = event => {
        const url = event.target.value
        this.setState({ url })
    }

    handleChangeUrlSite = event => {
        const urlSite = event.target.value
        this.setState({ urlSite })
    }

    render(){

        return(
            <>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Title>Ajouter un lieu</Title>
                    <Input 
                    placeholder="Nom du lieu"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    type="text"
                    required
                    />
                    <Input 
                    placeholder="Ville"
                    value={this.state.city}
                    onChange={this.handleChangeCity}
                    type="text"
                    required
                    />
                    <Input 
                    placeholder="Pays"
                    value={this.state.country}
                    onChange={this.handleChangeCountry}
                    type="text"
                    required
                    />
                    <Input 
                    placeholder="Url du site du lieu"
                    value={this.state.urlSite}
                    onChange={this.handleChangeUrlSite}
                    type="text"
                    required
                    />
                    <Input 
                    placeholder="Url de la photo du lieu"
                    value={this.state.url}
                    onChange={this.handleChangeUrl}
                    type="text"
                    required
                    />
                    <Button type='submit'><Text>Ajouter</Text></Button>
                </Form>
            </Container>
            <SpaceBetween/>
            </>
        )
    }
}

export default PlaceForm