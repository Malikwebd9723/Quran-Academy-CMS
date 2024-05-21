import React from 'react'
import styled from "styled-components"
import data from "../../assets/info/data"
import bgimg from "../../assets/images/bgSecOne.jpg"
const SectionOne = styled.section`
    min-height: 20vh;
    background-color: var(--white);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SectionTwo = styled.section`
    min-height: 20vh;
    background-image: url(${bgimg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin-bottom: 10vh;
`
const Container = styled.section`
    position: absolute;
    top: 17vh;
    background-color: var(--primary-bg);
    color: var(--white);
    width: 50%;
    text-align: center;
    border-radius: 10px;
    padding: 20px;
    border: 2px solid var(--white);
    @media (max-width:500px) {
        top:15vh;
        width: 70%;
    }
`
const Message = styled.section`
    background-color: var(--white);
    padding: 15px 10%;
    text-align: center;
    color: var(--primary-bg);
`
const H1 = styled.h1`
font-size: 40px;
    color:var(--orange);
`



const FirstSection = () => {
    return (
        <>
            <SectionOne>
                <H1>Our Vision</H1>
                <Container>{data.vision}</Container>
            </SectionOne>
            <SectionTwo>

            </SectionTwo>
            
            {data.message.map((val) => {
                return (
                    <>
                        <Message>
                            {val}
                        </Message>
                    </>
                )
            })}

        </>
    )
}

export default FirstSection
