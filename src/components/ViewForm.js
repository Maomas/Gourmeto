import React, {Component} from "react"
import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction:column;
justify-content:center;
padding:15px;
width: 780px;
height: 400px;
margin-top: 30px;
background: #EFEFEF;
border-radius: 5px;
`

const Form = styled.form`
display: flex;
flex-direction:column;
`


const Input = styled.textarea`
resize: none;
width: 760px;
height: 250px;
border-radius: 5px;
font-family: Roboto;
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

class ViewForm extends Component{

    state = {
        view: '',
        length: this.props.length
    }

    createView = () => {
        const {addView, id, length} = this.props

        const view = {
            id,
            view: this.state.view
        }
        addView(view)
        //Reset
        this.setState({ view: '', length })
    }

    handleChange = event => {
        const view = event.target.value
        const length = this.props.length - view.length
        this.setState({ view, length })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.createView()
    }

    handleKeyUp = event => {
        if(event.key === 'Enter'){
            this.createView()
        }
    }

    render(){
        return(
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Input value={this.state.view} onChange={this.handleChange} onKeyUp={this.handleKeyUp} maxLength={this.props.length} placeholder="Donnez votre avis sur ce lieu (maximum 340 caractères)." type="text" required/>
                    <Text>{this.state.length} caractères restants</Text>
                    <Button type='submit'><Text>Valider</Text></Button>
                </Form>               
            </Container>
        )
    }
}

export default ViewForm