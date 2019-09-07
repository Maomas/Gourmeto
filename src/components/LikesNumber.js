import React from "react"
import styled from 'styled-components'
import like from '../images/thumbs-up-solid.svg'

const Like = styled.img`
    height:50px;
    width:50px;
    @media (max-width: 768px){
        width: 20px;
        height: 20px;
    }
`;
const Number = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 32px;
line-height: 37px;
color: #EFEFEF;
margin-left: 3px;
margin-top: 8px;
@media (max-width: 768px){
    font-size: 16px;
    line-height: 19px;
    margin-top: 2px;
}
`;

const LikesMapper = styled.div`
display:flex;
margin-top:10px;
jutify-content:center;
align-content:center;
margin-left: 20px;
`;

export const LikesNumber = ({likesNumber}) => {
    return(
        <>
            <LikesMapper>
                <Like src={like} alt="Nombre de j'aime"></Like>
                <Number>{likesNumber} j'aime</Number>
            </LikesMapper>
        </>
    )
} 