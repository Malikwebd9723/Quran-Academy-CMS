import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import styled from "styled-components";
const host = "http://localhost:4000"


const Main = styled.section`
min-height: 74vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: var(--white);
`
const H1 = styled.h1`
font-size: 40px;
text-align: center;
color: var(--orange);
@media(max-width:800px){
  font-size: 30px;
}
`
const Para = styled.p`
font-size: 50px;
height: 80px;
text-align: center;
animation-name: move;
 animation-duration: 1s;
 animation-iteration-count: infinite;
    @keyframes move {
    100%{font-size:10px}
    50%{font-size:30px}
    100%{font-size:50px}
}
`
const Container = styled.section`
padding: 50px 20px;
min-width: 40%;
margin: 10px;
min-height: 100%;
border: 2px solid var(--orange);
border-radius: 20px;
  /* width: 40%; */
  background-color: var(--primary-bg);
  display: flex;
  flex-direction: column;
`

const Link = styled.a`
color: var(--white);
text-align: center;
margin: 5px;
font-size: 12px;
display: block;
`

const Login = () => {
    return (
        <>
            <Main>
                <H1>~~*~404~*~~</H1>
                <Container>
                <Para>&#129298;</Para>
                <H1>Oops! Page not found</H1>
                    <Link as={NavLink} to="/">Take me back</Link>
                </Container>
            </Main>
        </>
    )
}

export default Login
