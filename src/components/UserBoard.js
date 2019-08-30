import React, {Component} from "react"
import styled from 'styled-components'
import 'firebase/auth'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
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
const StrongText = styled.div`
margin-top: 10px;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 19px;
color: #000000;
`

const Avatar = styled.div`
width: 150px;
height: 150px;
background-size: cover;
border-radius:5px;
border: 1px solid black;
`

const RedText = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 19px;
margin-top: 10px;
color: #D51515;
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

const HeaderContainer = styled.div`
display:flex;
`

class UserBoard extends Component {

    state = {
        id: this.props.id,
        name: this.props.name,
        city: this.props.city,
        country: this.props.country,
        isAdmin: this.props.isAdmin,
        likesNumber: this.props.likesNumber,
        provider: this.props.provider,
        url: this.props.url,
        viewsNumber: this.props.viewsNumber
    }

    handleDelete = event => {
        confirmAlert({
            title: 'Suppression de l\'utilisateur',
            message: 'Etes-vous sûr de vouloir supprimer cet utilisateur ?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {
                    event.preventDefault()
                    var userId = this.state.id;
                    firebase.database().ref('/users/user-' + userId).remove().catch(function(error) {
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

    render(){
        let city, country, role, button;

        if(this.state.isAdmin){
            role='Administrateur du site'
            button=<RedText>L'administrateur ne peut pas être supprimé depuis cette page.</RedText>
        }
        else{
            role='Utilisateur basique'
            button=<Button onClick={this.handleDelete}><TextButton>Supprimer l'utilisateur</TextButton></Button>
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
                <HeaderContainer>
                    <a href={`profile/${this.state.id}`}><Avatar style={{ backgroundImage: `url(${this.state.url})`, backgroundColor: "white" }}/></a>
                </HeaderContainer>
                <StrongText>{this.state.name}</StrongText>
                <Text>{city}, {country}</Text>
                <Text>{this.state.viewsNumber} avis</Text>
                <Text>{this.state.likesNumber} j'aime</Text>
                <Text>{role}</Text>
                {button}
            </Container>
            </>
        )
    }
}

export default UserBoard