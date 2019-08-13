import React, {Component} from "react"
import MainTitle from './MainTitle'
import FloatingButton from './FloatingButton'
import SearchBar from './SearchBar'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import ViewBoard from './ViewBoard'
import base from '../base'

const Container = styled.div`
height:100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-bottom: 100px;
`
const TitleSearchBarContainer = styled.div`
  margin-top: 300px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`

const ListTitle = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 51.6px;
line-height: 60px;
margin-top: 200px;
color: #EFEFEF;
margin-bottom: 20px;`


const ViewsList = styled.div`
display:flex;
flex-direction:column;`

const Header = styled.div`
position: absolute;
left: 80%;
top: 69px;
width: 600px;
display: flex;
justify-content:center;
align-items: center;
`



class HomePage extends Component {

  state = {
    goToLogin: false,
    views: {},
    userId: '1'
  }

  componentDidMount() {
    base.syncState('/views', {
        context: this,
        state: 'views'
    })
}

isUser = userId => userId === this.state.userId

  goToLogin = event => {
    event.preventDefault()
        this.setState({ goToLogin: true})
  }

  render(){

    const views = Object.keys(this.state.views)
        .map(key => (
                <ViewBoard
                key={key}
                id={this.state.views[key].id}
                userId={this.state.userId} 
                isUser={this.isUser}
                name='William Dupont'
                time='0 minutes'
                place={this.state.views[key].place}
                description={this.state.views[key].view}
                url={this.state.views[key].url}
                />
          ))

    if(this.state.goToLogin){
      return <Redirect push to={'/login'}></Redirect>
    }

    return(
      <Container>
      <Header>
        <a href="login" onClick={this.goToLogin} style={{ textDecoration: 'none', color:'#EFEFEF' }}><FloatingButton>Se connecter</FloatingButton></a>
      </Header>
      <TitleSearchBarContainer>
        <MainTitle />
        <SearchBar />
      </TitleSearchBarContainer>
      <ViewsList>
        <ListTitle>Avis</ListTitle>
          { views }
        </ViewsList>
    </Container>
      )
  }
}

export default HomePage