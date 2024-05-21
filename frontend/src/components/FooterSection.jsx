import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from "styled-components"


const Footer = styled.section`
display: flex;
background-color: var(--primary-bg);
flex-direction: column;
justify-content: center;
text-align: center;
min-height: 10vh;
padding-bottom: 80px;
padding-top: 40px;
letter-spacing: 3px;
color: var(--white);
`
const H4 = styled.h4`
font-size: 15px;
    @media (max-width: 500px) {
  font-size: 10px;
  }
`
const Li = styled.li`
    color: var(--orange);
`
const FooterSection = () => {
  return (
    <>
      <Footer>
        <H4>copyright © <Li as={NavLink} to="mailto:malik9723usman@gmail.com">malik9723usman@gmail.com</Li></H4>
        <H4>All rights reserved!</H4>
      </Footer>
    </>
  )
}

export default FooterSection
