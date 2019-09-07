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
@media (max-width: 768px) {
	width: 266.86px;
	height: 250px;
}
`

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
}
`

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

const SuggestionPhoto = styled.div`
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

  componentDidMount() {
    firebase.database().ref('/users/user-' + this.state.uid).once('value').then(snapshot => {
      this.setState({username: snapshot.val().name})
    });
  }


    state = {
        id: this.props.id,
        name: this.props.name,
        url: this.props.url,
        city: this.props.city,
        country: this.props.country,
        uid: this.props.uid,
        username: ''
    }

    handleAdd = event => {
        confirmAlert({
            title: 'Ajout de la suggestion',
            message: 'Etes-vous sûr de vouloir accepter cette suggestion ?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {
                    event.preventDefault()
                    firebase.database().ref('/places/place-' + Date.now()).set({
                        name: this.state.name,
                        url: this.state.url,
                        city: this.state.city,
                        country: this.state.country,
                        viewsNumber: '0'
                    })
                    firebase.database().ref('/suggestions/' + this.state.id).remove().catch(function(error) {
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

    handleDelete = event => {
        confirmAlert({
            title: 'Refus de la suggestion',
            message: 'Etes-vous sûr de vouloir refuser cette suggestion ?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {
                    event.preventDefault()
                    firebase.database().ref('/suggestions/' + this.state.id).remove().catch(function(error) {
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
        return(
            <>
            <Container>
                <SuggestionPhoto style={{ backgroundImage: `url(${this.state.url})` }} />
                <StrongText>{this.state.name}</StrongText>
                <Text>{this.state.city}, {this.state.country}</Text>
                <Text>Suggéré par : {this.state.username}</Text>
                <Button onClick={this.handleAdd}><TextButton>Valider</TextButton></Button> 
                <Button onClick={this.handleDelete}><TextButton>Refuser</TextButton></Button> 
            </Container>
            </>
        )
    }
}

export default PlaceBoard