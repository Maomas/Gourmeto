import React, {Component} from "react"
import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction:column;
padding:15px;
width: 555px;
height: 450px;
background: #EFEFEF;
border-radius: 5px;
margin-top:20px;
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
		isUser: this.props.isUser
	}

	render(){
			return (
				<>
					<Container>
						<HeaderContainer>
							<a href={`/profile/${this.state.uid}`} ><Avatar style={{ backgroundImage: `url(${this.state.urlUser})` }}/></a>
							<Header>
								<a href={`/profile/${this.state.uid}`}  style={{ textDecoration: 'none', color: '#EFEFEF' }}><StrongText>{this.state.name}</StrongText></a>
								<Text>il y a {this.state.time}</Text>
							</Header>
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