import React, {Component} from "react"
import styled from "styled-components"
import base from '../base'
import 'firebase/auth'
import firebase from 'firebase/app'
import {Redirect} from 'react-router-dom'

class Admin extends Component{

    state= {
        isAdmin: null,
        goToHomePage: false
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.handleAuth({ user })
            }
        })
    }

    handleAuth = async authData => {
        const currentUser = {
            uid: authData.user.uid,
            name: authData.user.displayName,
            email: authData.user.email,
            url: authData.user.photoURL,
        }
        this.setState({currentUser: currentUser})
        firebase.database().ref('/users/user-' + this.state.currentUser.uid).once('value').then(snapshot => {
            if(!snapshot.val().isAdmin){
                this.setState({goToHomePage: true})
            }
        })
      }

    render() {
        if(this.state.goToHomePage){
            return <Redirect push to={'/'}></Redirect>
        }
        return(
            <>
            <div>Oui</div>
            </>
        )
    }
}

export default Admin;