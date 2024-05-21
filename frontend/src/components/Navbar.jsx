import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import styled from "styled-components"
import { NavLink } from "react-router-dom"
//all logo inport from material ui
//home logo
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
//about us logo
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
//our programmes logo
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
//contact logo
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
//profile logo
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Nav = styled.nav`
display: flex;
align-items: center;
justify-content: center;
padding-bottom: 1em;
position: fixed;
width: 100%;
z-index: 99;
bottom: 0;
`
const Ul = styled.ul`
    padding: 10px;
    background:var(--nav-bg);
    backdrop-filter: blur(5px);
    border-radius: 15px 15px 0px 0px;
`
const Li = styled.li`
padding: 10px;
margin: 2px;
text-align: center;
text-decoration: none;
color: var(--primary-bg) !important;
`

const Navbar = () => {
    return (
        <>
            <Nav>
                <Ul>
                    <Tooltip title="Home">
                        <Li as={NavLink} to="/"><RoofingOutlinedIcon fontSize='large' /></Li>
                    </Tooltip>
                    <Tooltip title="About">
                        <Li as={NavLink} to="/about"><Diversity2OutlinedIcon fontSize='large'/> </Li>
                    </Tooltip>
                    <Tooltip title="Programmes">
                        <Li as={NavLink} to="/programmes"><GrassOutlinedIcon fontSize='large'/> </Li>
                    </Tooltip>
                    <Tooltip title="Contact">
                        <Li as={NavLink} to="/contact"><ContactPhoneIcon fontSize='large'/> </Li>
                    </Tooltip>
                    <Tooltip title="Profile">
                        <Li as={NavLink} to="/profile"><AccountCircleIcon fontSize='large'/> </Li>
                    </Tooltip>
                </Ul>
            </Nav>
        </>
    )
}

export default Navbar
