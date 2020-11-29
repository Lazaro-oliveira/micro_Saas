import React from 'react';
import {Logo, HeaderContainer} from './styles';
import Icone from "../../assets/construcao.png";


function Header(props){
    return(
        <>
            <HeaderContainer>
                <Logo src={Icone} alt= 'Micro-Saas - Encurtador de URL' />
                <h1>Micro-Saas</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>
    )
}


export default Header;