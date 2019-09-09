import React, {Component} from "react"
import styled from 'styled-components'
import heart from "../images/heart.svg"
import redHeart from "../images/redHeart.svg"
import crossImage from "../images/cross.png"
import base from '../base'
import 'firebase/auth'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'firebase/auth'
import firebase from 'firebase/app'

const Container = styled.div`
position: relative;
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
	height: 200px;
}
`

const Cross = styled.img`
position:absolute;
right: 30px;
height: 60px;
width: 60px;
cursor:pointer;
@media (max-width: 768px) {
	height: 30px;
	width: 30px;
	right: 20px;
}`

const Like = styled.img`
position:absolute;
right: 30px;
height: 60px;
width: 60px;
cursor:pointer;
@media (max-width: 768px) {
	height: 30px;
	width: 30px;
	right: 20px;
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
	width: 252.44px;
	height: 50.06px;
}
`

const Avatar = styled.div`
width: 82.94px;
height: 84.17px;
background-size: cover;
border-radius:5px;
cursor:pointer;
border: 1px solid black;
@media (max-width: 768px) {
	width: 32.22px;
	height: 32.7px;
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
	line-height: 12px;
}
`

const StrongText = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 19px;
color: #000000;
cursor:pointer;
@media (max-width: 768px) {
	font-size: 12px;
	line-height: 8px;
}
`

const Header = styled.div`
display: flex;
flex-direction: column;
margin-left:10px;
justify-content:center;
`

const HeaderContainer = styled.div`
display:flex;
`

const TextButton = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
border-radius: 4px;
@media (max-width: 768px) {
	font-size: 13px;
}
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
@media (max-width: 768px) {
	width: 200px;
    height: 20px;
}
`

class ViewBoard extends Component{


	componentDidMount() {
		firebase.database().ref('/users/user-'+this.state.uid).once('value').then(snapshot => {
            base.syncState(`/users/user-${this.state.uid}/likesNumber`, {context: this, state: 'likesNumber'})
		})
		base.syncState(`views/${this.state.id}/likes`, {context: this, state: 'likes'})
	}

	state = {
		currentUserId: this.props.currentUserId,
		id: this.props.id,
		placeId: this.props.placeId,
		key:this.props.key,
		name: this.props.name,
		time: this.props.time,
		place: this.props.place,
		description: this.props.description,
		url: this.props.url,
		uid: this.props.uid,
		userName: this.props.userName,
		likesNumber: '',
		urlUser: this.props.urlUser,
		likes: {},
		like:'',
		user: {},
		admin: this.props.admin,
		isLiked: false,
		likeId: ''
	}

	
    handleDelete = event => {
        confirmAlert({
            title: 'Suppression de l\'avis',
            message: 'Etes-vous sûr de vouloir supprimer cet avis ?',
            buttons: [
              {
                label: 'Oui',
                onClick: () => {
					event.preventDefault()
					var viewId = this.state.id;
                    firebase.database().ref('/views/' + viewId).remove().catch(function(error) {
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
	  
	handleClick = event => {
		event.preventDefault()
		if(this.state.isLiked || 'like-'+this.state.currentUserId in this.state.likes){
			this.deleteLike('like-'+this.state.currentUserId)
		}
		else{
			const like = {
				uid: this.state.currentUserId,
				placeId: this.state.placeId
			}
			this.addLike(like)
			this.setState({like})
		}
	}

	addLike = like => {
		const likes = {...this.state.likes}
		likes[`like-${this.state.currentUserId}`] = like
		this.setState({likeId: `like-${this.state.currentUserId}`})
		this.setState({likes})
		this.setState({isLiked:true})
		var likesNumber = parseInt(this.state.likesNumber) + 1
        this.setState({likesNumber: likesNumber.toString()})
	}

	deleteLike = key => {
		const likes = {...this.state.likes}
		likes[key] = null
		this.setState({likes})
		this.setState({isLiked: false})
		var likesNumber = parseInt(this.state.likesNumber) - 1
        this.setState({likesNumber: likesNumber.toString()})
	}

	render(){
			let like, button, cross;

			if(this.state.currentUserId===this.state.uid){
				cross = <Cross src={crossImage} onClick={this.handleDelete} alt="cross"></Cross>
			}

			else{
				if(this.state.isLiked || 'like-'+this.state.currentUserId in this.state.likes){
					like = <Like src={redHeart} onClick={this.handleClick} alt="like"></Like>
				} else{
					like = <Like onClick={this.handleClick} src={heart} alt="unlike"></Like>
				}
			}

			if(this.state.admin === 'true'){
				button=<Button onClick={this.handleDelete}><TextButton>Supprimer l'avis</TextButton></Button>
				like=<span></span>
				cross=<span></span>
			}

			return (
				<>
					<Container>
						<HeaderContainer>
							<a href={`/profile/${this.state.uid}`} ><Avatar style={{ backgroundImage: `url(${this.state.urlUser})`, backgroundColor: "white" }}/></a>
							<Header>
								<a href={`/profile/${this.state.uid}`}  style={{ textDecoration: 'none', color: '#EFEFEF' }}><StrongText>{this.state.name}</StrongText></a>
								<Text>Le {this.state.time}</Text>
							</Header>
							{like}
							{cross}
						</HeaderContainer>
						<a href={`/place/${this.state.placeId}`} ><PlacePhoto  style={{ backgroundImage: `url(${this.state.url})` }} /></a>
						<a href={`/place/${this.state.placeId}`}  style={{ textDecoration: 'none', color: '#EFEFEF' }}><StrongText>{this.state.place}</StrongText></a>
						<Text>{this.state.description}</Text>
						{button}
					</Container>
				</>
			)
	}
}

export default ViewBoard