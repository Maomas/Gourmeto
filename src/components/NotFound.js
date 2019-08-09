import React from "react"
import './NotFound.css'
import FloatingButton from './FloatingButton'

const NotFound = () => {

    return(
        <>
        <FloatingButton>Accueil</FloatingButton>
        <div className="container">
            <div className="notFoundTitle">Oups !</div>
            <div className="notFoundBody">La page que vous recherchez n'existe pas ou a été supprimé.</div>
        </div>
        </>
    )
}

export default NotFound