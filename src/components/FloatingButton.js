import React from "react"
import './FloatingButton.css'

const FloatingButton = ({children}) => {
    return(
        <>           
            <div className="button"><span className="text">{children}</span></div>          
        </>
    )
}

export default FloatingButton;