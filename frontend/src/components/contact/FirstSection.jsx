import React from 'react'
import styled from "styled-components"
import PinDropIcon from '@mui/icons-material/PinDrop';
const SectionOne = styled.section`
    min-height: 60vh;
    background-color: var(--primary-bg);

`
const Container = styled.section`
width: 100%;
height: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 10px;
`
const AsideOne = styled.section`
width: 50%;
padding: 5vh;
@media (max-width:800px){
    width: 100%;
}
`
const AsideTwo = styled.section`
width: 50%;
@media (max-width:800px){
    width: 100%;
}
`
const Map = styled.iframe`
    width: 100%;
    border-left: 4px solid var(--orange) !important;
    @media (max-width:500px){
        border-left: 0 !important;
        border-top: 4px solid var(--orange) !important;
}

`
const H1 = styled.h1`
    font-size: 40px;
    color: var(--orange);
    text-align: center;
    @media (max-width:800px){
        font-size: 30px;
}
`
const Para = styled.p`
color: var(--white);
text-align: center;
line-height: 20px;
    
`
const FirstSection = () => {
    return (
        <>
            <SectionOne>
                <Container>
                    <AsideOne>
                    <H1><PinDropIcon/></H1>
                        <H1>Let`s Get In Touch </H1>
                        <Para>Visit us physically.</Para>
                        <Para>24/7, Always here for you.</Para>
                        <Para>You can call, chat or E-mail using the details below.</Para>

                    </AsideOne>

                    <AsideTwo>
                        <Map
                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6581.152456170333!2d73.13590517095047!3d34.43751786296085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de1459dc43ede9%3A0x41968ca7c63399aa!2sMuradpur!5e0!3m2!1sen!2s!4v1689696064451!5m2!1sen!2s" title='map' width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/>
                    </AsideTwo>
                </Container>
            </SectionOne>
        </>
    )
}

export default FirstSection
