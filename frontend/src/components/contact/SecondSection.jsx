import React from 'react'
import styled from 'styled-components'
import data from '../../assets/info/data';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import bgimg from "../../assets/images/bgSecOne.jpg"


const SectionOne = styled.section`
margin: 10vh 0;
    min-height: 60vh;
    background-image: url(${bgimg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Container = styled.section`
    width: 90%;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const Box = styled.section`
    text-align: center;
    background-color: var(--primary-bg);
    color: var(--white);
    margin: 10px;
    padding: 20px 20px;
    width: 30%;

    border-radius: 50px;
    @media(max-width:800px){
        width: 100%;
    }
`
const Para = styled.p`
padding: 5px;
    
`
const Img = styled.section`
    color: var(--orange);
`

const SecondSection = () => {
    return (
        <>
            <SectionOne>
                <Container>
                    <Box>
                        <Img>
                        <PinDropIcon fontSize='large'/>
                        </Img>
                        <Para>{data.address}</Para>
                    </Box>
                    <Box>
                        <Img>
                        <AlternateEmailIcon fontSize='large'/>
                        </Img>
                        <Para>{data.email}</Para>
                    </Box>
                    <Box>
                        <Img>
                        <LocalPhoneIcon fontSize='large'/>
                        </Img>
                        {data.academyContact.map((val) => {
                            return (
                                <>
                                    <Para>
                                        {val}
                                    </Para>
                                </>
                            )
                        })}
                    </Box>
                </Container>
            </SectionOne>
        </>
    )
}

export default SecondSection
