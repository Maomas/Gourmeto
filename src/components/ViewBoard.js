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
		name: 'William Dupont',
		time: '9 minutes',
		place: 'La Lorgnette',
		description: 'Blablabla'
	}

	render(){

		return (
			<>
				<Container>
					<HeaderContainer>
						<a href="/profile/1" ><Avatar /></a>
						<Header>
							<a href="/profile/1"  style={{ textDecoration: 'none', color: '#EFEFEF' }}><StrongText>{this.state.name}</StrongText></a>
							<Text>il y a {this.state.time}</Text>
						</Header>
					</HeaderContainer>
					<a href="/place/1" ><PlacePhoto /></a>
					<a href="/place/1" style={{ textDecoration: 'none', color: '#EFEFEF' }}><StrongText>{this.state.place}</StrongText></a>
					<Text>{this.state.description}</Text>
				</Container>
			</>
		)
	}
}

export default ViewBoard