import React, {Component} from "react"
import styled from 'styled-components'
import 'firebase/auth'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import 'firebase/auth'
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
`

const TextButton = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
border-radius: 4px;
`

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
`

const Text = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 19px;
margin-top: 10px;
color: #000000;
`

const StrongText = styled.div`
margin-top: 10px;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 19px;
color: #000000;
`

const PlacePhoto = styled.div`
width: 525px;
height: 160px;
border-radius: 5px;
margin-top: 10px;
background-size: cover;
margin-bottom: 10px;
border: 1px solid black;
`

class PlaceBoard extends Component {

    handleDelete = event => {
        confirmAlert({
            title: 'Suppression du lieu',
            message: 'Etes-vous sûr de vouloir supprimer ce lieu ?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {
                    event.preventDefault()
                    var id = this.state.id
                    firebase.database().ref('/places/place-' + id).remove().catch(function(error) {
                        console.log(error)
                    });
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
        viewsNumber: this.props.viewsNumber
    }

    render(){
        let city, country, updateButton, deleteButton;

        updateButton = <Button><TextButton>Modifier le lieu</TextButton></Button>
        deleteButton = <Button onClick={this.handleDelete}><TextButton>Supprimer le lieu</TextButton></Button> 

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
                <PlacePhoto style={{ backgroundImage: `url(${this.state.url})` }} />
                <StrongText>{this.state.name}</StrongText>
                <Text>{city}, {country}</Text>
                <Text>{this.state.viewsNumber} avis</Text>
                {updateButton}
                {deleteButton}
            </Container>
            </>
        )
    }
}

export default PlaceBoard