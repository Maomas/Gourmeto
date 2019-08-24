import React, {Component} from "react"
import styled from 'styled-components'
import heart from "../images/heart.svg"
import redHeart from "../images/redHeart.svg"
import base from '../base'
import firebase from 'firebase/app'
import 'firebase/auth'

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
`;


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

class ViewBoard extends Component{


	componentDidMount() {
		base.syncState('/likes', {
			context: this,
			state: 'likes',
			like: '',
			id: ''
		})
	}

	state = {
		id: this.props.id,
		name: this.props.name,
		time: this.props.time,
		place: this.props.place,
		description: this.props.description,
		url: this.props.url,
		uid: this.props.uid,
		userName: this.props.userName,
		urlUser: this.props.urlUser,
		likes: {},
		isLiked: false,
		like:''
	}

	handleClick = event => {
		event.preventDefault()
		console.log(this.state.like)
		if(this.state.isLiked){
			this.deleteLike(this.state.id)
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
		this.setState({id: `like-${Date.now()}`})
        this.setState({likes})
	}

	deleteLike = key => {
		const likes = {...this.state.likes}
		likes[key] = null
		this.setState({likes})
	}

	render(){
			return (
				<>
					<Container>
						<HeaderContainer>
							<a href={`/profile/${this.state.uid}`} ><Avatar style={{ backgroundImage: `url(${this.state.urlUser})`, backgroundColor: "white" }}/></a>
							<Header>
								<a href={`/profile/${this.state.uid}`}  style={{ textDecoration: 'none', color: '#EFEFEF' }}><StrongText>{this.state.name}</StrongText></a>
								<Text>Le {this.state.time}</Text>
							</Header>
							{this.state.isLiked ? (
								<Like src={redHeart}  onClick={this.handleClick} alt="like"></Like>
							) : (
								<Like onClick={this.handleClick} src={heart} alt="unlike"></Like>
							)}
						</HeaderContainer>
						<a href={`/place/${this.state.id}`} ><PlacePhoto  style={{ backgroundImage: `url(${this.state.url})` }} /></a>
						<a href={`/place/${this.state.id}`}  style={{ textDecoration: 'none', color: '#EFEFEF' }}><StrongText>{this.state.place}</StrongText></a>
						<Text>{this.state.description}</Text>
					</Container>
				</>
			)
	}
}

export default ViewBoard