import React from 'react'
import styled from "styled-components"
import data from "../../assets/info/data"
import { NavLink } from "react-router-dom"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const SectionOne = styled.section`
min-height: 60vh;
background-color: var(--primary-bg);
display: flex;
flex-direction: column;
justify-content: center;
`
const H1 = styled.h1`
    text-align: center;
    font-size: 40px;
    color: var(--orange);
`
const H3 = styled.h3`
font-size: 20px;
    text-align: center;
`
const H5 = styled.h5`
    text-align: center;
    color: var(--orange);
`
const Members = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 5% 0;
    background-color: var(--white);
    margin: 2vh 0;
`
const Member = styled.section`
width: 30%;
background-color: var(--primary-bg);
border-radius: 50px;
margin: 10px;
padding: 10px;
color: var(--white);
transition: all 0.5s ease;
&:hover{
    background-color: var(--white);
    color: var(--primary-bg);
    border:1px solid var(--primary-bg);
}
@media (max-width: 500px) {
    width: 100%;
  }
`
const Whatsapp = styled.section`
    padding: 7px;
    display: flex;
    align-items: center;
    animation-name: move;
 animation-duration: 2s;
 animation-iteration-count: infinite;
    @keyframes move {
    100%{opacity:0%}
    50%{opacity:50%}
    100%{opacity:100%}
}
`
const Link = styled.a`
margin: auto;
color: Green;
`
const FirstSection = () => {
    return (
        <>
            <SectionOne>
                <H1>Our Team</H1>
                <Members>
                    {data.team.map((val) => {
                        return (
                            <>
                                <Member>
                                    <H3>{val.name}</H3>
                                    <H5>{val.role}</H5>
                                    <Whatsapp>
                                        <Link target='_blank' as={NavLink} to={val.number}><WhatsAppIcon /></Link>
                                    </Whatsapp>
                                </Member>
                            </>
                        )
                    })}
                </Members>
                <H5>Team of Qulalified and Experianced staff</H5>
                <H5>~~~~~~~*~~~~~~~</H5>
            </SectionOne>
        </>
    )
}

export default FirstSection
