import React, {Component} from "react"
import styled from 'styled-components'
import heart from "../images/heart.svg"
import redHeart from "../images/redHeart.svg"
import base from '../base'
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

const Like = styled.img`
height: 60px;
width: 60px;
margin-left: 150px;
margin-top: 10px;
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

const Avatar = styled.div`
width: 82.94px;
height: 84.17px;
background-size: cover;
border-radius:5px;
cursor:pointer;
border: 1px solid black;
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
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 19px;
color: #000000;
cursor:pointer;
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

class ViewBoard extends Component{


	componentDidMount() {
		base.syncState('/likes', {
			context: this,
			state: 'likes'
		})
		firebase.database().ref('/users/user-'+this.state.uid).once('value').then(snapshot => {
            base.syncState(`/users/user-${this.state.uid}/likesNumber`, {context: this, state: 'likesNumber'})
        })
	}

	state = {
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
		isLiked: false,
		like:'',
		likeId: '',
		user: {},
		admin: this.props.admin
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
					console.log('/views/view-' + viewId)
                    firebase.database().ref('/views/view-' + viewId).remove().catch(function(error) {
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
		if(this.state.isLiked){
			this.deleteLike(this.state.likeId)
			this.setState({isLiked: false})
		}
		else{
			const like = {
				uid: this.props.uid,
				placeId: this.state.id
			}
			this.addLike(like)
			this.setState({like})
			this.setState({isLiked: true})
		}
	}

	addLike = like => {
		const likes = {...this.state.likes}
		likes[`like-${Date.now()}`] = like
		this.setState({likeId: `like-${Date.now()}`})
		this.setState({likes})
		var likesNumber = parseInt(this.state.likesNumber) + 1
        this.setState({likesNumber: likesNumber.toString()})
	}

	deleteLike = key => {
		const likes = {...this.state.likes}
		likes[key] = null
		this.setState({likes})
		var likesNumber = parseInt(this.state.likesNumber) - 1
        this.setState({likesNumber: likesNumber.toString()})
	}

	render(){
			let like, button;

			if(this.state.admin === 'false' || !this.state.admin){
				if(this.state.isLiked){
					like = <Like src={redHeart} onClick={this.handleClick} alt="like"></Like>
				} else{
					like = <Like onClick={this.handleClick} src={heart} alt="unlike"></Like>
				}
			}
			else{
				button=<Button onClick={this.handleDelete}><TextButton>Supprimer l'avis</TextButton></Button>
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