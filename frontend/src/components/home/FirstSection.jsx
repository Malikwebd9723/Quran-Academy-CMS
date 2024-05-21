import React from 'react'
import data from "../../assets/info/data"
import styled from "styled-components"
import bgimg from "../../assets/images/bgSecOne.jpg"
import { NavLink } from 'react-router-dom';


const SectionOne = styled.section`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${bgimg});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(5px);
  border-radius: 0px 0px 50% 30%;
  @media (max-width:500px) {
    min-height: 40vh;
  }
`;
const Para = styled.p`
  color: var(--orange);
`;
const H1 = styled.h1`
  font-size: 80px;
  color:var(--white);
  @media (max-width:500px) {
   font-size: 60px;
  }
`;
const H4 = styled.h4`
color: var(--white);
margin-bottom: 1%;
`;
const Button = styled.button`
cursor: pointer;
padding: 10px;
margin-top: 10%;
border: none;
border-radius: 10px;
background-color: var(--orange);
font-size: large;
`;
const Li = styled.a`
padding: 5px;
margin: 5px;
text-align: center;
list-style: none;
`
const FirstSection = () => {
  return (
    <>
              {/* section one */}
              <SectionOne>
          <Para className='left'>{data.greet}</Para>
          <H1 id="name">{data.name}</H1>
          <H4 className='left'>{data.silentMessage}</H4>
          <Para className='left'>{data.mission}</Para>
          <Li as={NavLink} to="/registeration"><Button className='left'>Register Now</Button></Li>

        </SectionOne>
    </>
  )
}

export default FirstSection
