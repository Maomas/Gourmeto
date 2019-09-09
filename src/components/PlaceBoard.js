import React, {Component} from "react"
import styled from 'styled-components'
import 'firebase/auth'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'firebase/auth'
import firebase from 'firebase/app'
import base from '../base'
import {Redirect} from 'react-router-dom'

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
@media (max-width: 768px) {
	width: 266.86px;
	height: 220px;
}`

const TextButton = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
border-radius: 4px;
@media (max-width: 768px) {
	font-size: 15px;
}`

const Button = styled.div`
margin-top:20px;
width: 400px;
height: 60px;
cursor:pointer;
display: flex;
justify-content: center;
align-items: center;
background: #C4C4C4;
mix-blend-mode: hard-light;
border: 1px solid black;
backdrop-filter: blur(4px);
border-radius: 4px;
@media (max-width: 768px) {
    height: 20px;
    width: 200px;
}`

const Text = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 19px;
margin-top: 10px;
color: #000000;
@media (max-width: 768px) {
	font-size: 12px;
	line-height: 8px;
}`

const StrongText = styled.div`
margin-top: 10px;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 19px;
color: #000000;
@media (max-width: 768px) {
	font-size: 12px;
	line-height: 8px;
}`

const Input = styled.textarea`
display: flex;
justify-content:center;
align-items:center;
resize: none;
border-radius: 5px;
font-family: Roboto;
height:50px;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 31px;
padding: 5px;
color: #000000;
@media (max-width: 768px) {
    font-size: 15px;
    line-height: 10px;
    margin-bottom: 1px;
}
`

const PlacePhoto = styled.div`
width: 525px;
height: 160px;
border-radius: 5px;
margin-top: 10px;
background-size: cover;
margin-bottom: 10px;
border: 1px solid black;
@media (max-width: 768px) {
    width: 240px;
    height: 60px;
}`

class PlaceBoard extends Component {

    componentDidMount(){
        base.syncState(`/places/${this.state.id}/name`, {context: this,state: 'name'})
        base.syncState(`/places/${this.state.id}/city`, {context: this,state: 'city'})
        base.syncState(`/places/${this.state.id}/country`, {context: this,state: 'country'})
        base.syncState(`/places/${this.state.id}/url`, {context: this,state: 'url'})
        base.syncState(`/places/${this.state.id}/urlSite`, {context: this,state: 'urlSite'})
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

    handleUpdate = event => {
        event.preventDefault()
        this.setState({update: true})
    }

    handleUpdatePlace = event => {
        event.preventDefault()
        base.syncState(`/places/${this.state.id}/name`, {context: this,state: 'name'})
        base.syncState(`/places/${this.state.id}/city`, {context: this,state: 'city'})
        base.syncState(`/places/${this.state.id}/country`, {context: this,state: 'country'})
        base.syncState(`/places/${this.state.id}/url`, {context: this,state: 'url'})
        base.syncState(`/places/${this.state.id}/urlSite`, {context: this,state: 'urlSite'})
        this.setState({update: false})
    }

    handleCancelPlace = event => {
        event.preventDefault()
        this.setState({update: false})
    }

    handleDelete = event => {
        confirmAlert({
            title: 'Suppression du lieu',
            message: 'Etes-vous sûr de vouloir supprimer ce lieu ?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {
                    event.preventDefault()
                    firebase.database().ref('/places/' + this.state.id).remove().catch(function(error) {
                        console.log(error)
                    });
                    this.setState({goToAdmin: true})
                }
              },
              {
                label: 'Annuler',
                onClick: () => {}
              }
            ]
          });
      }

    state = {
        id: this.props.id,
        name: this.props.name,
        key: this.props.key,
        city: this.props.city,
        country: this.props.country,
        url: this.props.url,
        urlSite: this.props.urlSite,
        viewsNumber: this.props.viewsNumber,
        update: false,
        goToAdmin: false
    }

    render(){
        if(this.state.goToAdmin){
            return <Redirect push to={'/admin'}></Redirect>
        }

        let city, country, updateButton, deleteButton, viewsNumber, placePhoto, updatePlaceButton, cancelButton;

        if(!this.state.update){
            updateButton = <Button onClick={this.handleUpdate}><TextButton>Modifier le lieu</TextButton></Button>
            deleteButton = <Button onClick={this.handleDelete}><TextButton>Supprimer le lieu</TextButton></Button> 
            viewsNumber= <Text>{this.state.viewsNumber} avis</Text>
            placePhoto = <a href={`place/${this.state.id.substring(6)}`}><PlacePhoto style={{ backgroundImage: `url(${this.state.url})` }} /></a>
        } else{
            updatePlaceButton = <Button onClick={this.handleUpdatePlace}><TextButton>Valider</TextButton></Button>
            cancelButton = <Button onClick={this.handleCancelPlace}><TextButton>Annuler</TextButton></Button>
        }

        if(this.state.city  && !this.state.country){
            city=this.state.city
            country='pas de pays défini'
        }
        else if(this.state.country && !this.state.city){
            city='Pas de ville définie'
            country=this.state.country
        }
        else if(this.state.country && this.state.city){
            city=this.state.city
            country=this.state.country
        }
        else{
            city='Pas de ville définie'
            country='ni de lieu défini'
        }

        return(
            <>
            <Container>
                {placePhoto}
                {this.state.update ? (
                    <>
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
                    placeholder="URL du site du lieu"
                    value={this.state.urlSite}
                    onChange={this.handleChangeUrlSite}
                    type="text"
                    required
                    />
                    <Input 
                    placeholder="URL de la photo du lieu"
                    value={this.state.url}
                    onChange={this.handleChangeUrl}
                    type="text"
                    required
                    />
                    {updatePlaceButton}
                    {cancelButton}
                    </>
                ) : (
                    <>
                    <StrongText>{this.state.name}</StrongText>
                    <Text>{city}, {country}</Text>
                    </>
                )}
                {viewsNumber}
                {updateButton}
                {deleteButton}
            </Container>
            </>
        )
    }
}

export default PlaceBoard