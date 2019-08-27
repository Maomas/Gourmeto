import React, {Component} from "react"
import styled from 'styled-components'
import 'firebase/auth'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'firebase/auth'
import base from '../base'

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
justify-content:center;
`

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 75px;
color: #000000;`

const SpaceBetween = styled.div`
width: 20px;
`

const Form = styled.form`
display: flex;
flex-direction:column;
`

const Input = styled.textarea`
resize: none;
border-radius: 5px;
font-family: Roboto;
height:40px;
font-style: normal;
font-weight: normal;
font-size: 26.3333px;
line-height: 31px;
padding: 10px;
color: #000000;
`

const Button = styled.button`
display: flex;
background: #C4C4C4;
mix-blend-mode: hard-light;
border: 1.0022px solid #FFFFFF;
backdrop-filter: blur(4.00879px);
justify-content:center;
border-radius: 7.40084px;
padding:15px;
margin-top:20px;
cursor:pointer;`

const Text = styled.span`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 26.3912px;
line-height: 31px;
color: #000000;`

class PlaceForm extends Component {


    state = {
        country: '',
        city: '',
        name: '',
        url :'',
        viewsNumber: '0',
        id: Date.now()
    }

    handleSubmit = event => {
        event.preventDefault()
        base.post(`places/place-${this.state.id}/id`,{ data: this.state.id}) 
        base.post(`places/place-${this.state.id}/name`,{ data: this.state.name}) 
        base.post(`places/place-${this.state.id}/city`,{ data: this.state.city}) 
        base.post(`places/place-${this.state.id}/country`, {data: this.state.country})
        base.post(`places/place-${this.state.id}/url`, {data: this.state.url})
        base.post(`places/place-${this.state.id}/viewsNumber`, {data: this.state.viewsNumber})
        this.setState({country: ''})
        this.setState({city: ''})
        this.setState({name: ''})
        this.setState({url: ''})
        this.setState({id:''})

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

    render(){
        let display;

        if(this.props.displayForm){
            display=true
        }
        else{
            display=false
        }
        return(
            <>
            {display ? (
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Title>Ajouter un lieu</Title>
                    <Input 
                    placeholder="Nom du lieu"
                    onChange={this.handleChangeName}
                    type="text"
                    required
                    />
                    <Input 
                    placeholder="Ville"
                    onChange={this.handleChangeCity}
                    type="text"
                    required
                    />
                    <Input 
                    placeholder="Pays"
                    onChange={this.handleChangeCountry}
                    type="text"
                    required
                    />
                    <Input 
                    placeholder="Url de la photo du lieu"
                    onChange={this.handleChangeUrl}
                    type="text"
                    required
                    />
                    <Button type='submit'><Text>Ajouter</Text></Button>
                </Form>
            </Container>
            ) : (
                <span></span>
            )}
            <SpaceBetween/>
            </>
        )
    }
}

export default PlaceForm