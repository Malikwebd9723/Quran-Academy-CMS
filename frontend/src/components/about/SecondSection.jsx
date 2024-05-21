import React from 'react'
import styled from "styled-components"
import data from '../../assets/info/data'
import bgimg from "../../assets/images/bgSecOne.jpg"

const SectionOne = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10vh 0;
    background-image: url(${bgimg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;

`
const Container = styled.section`
    width: 80%;
    background-color: var(--primary-bg);
    padding: 3% 7%;
    color: var(--white);
    border-radius: 50px;
    margin: 5%;
    @media (max-width:500px){
        width: 100%;
    }
`
const Ol = styled.ol`
    
`
const Li = styled.li`
    list-style: disc;
    padding: 5px;
`
const H1 = styled.h1`
    font-size: 30px;
    color:var(--orange);
    text-align: center;
    margin: 3%;
    @media (max-width:500px){
        font-size: 20px;
    }
`

const SecondSection = () => {
    // window.addEventListener('scroll',()=>{
    //     document.getElementById("container").style.transform=`translateX(${(window.scrollY) * 0.1}px)`
    // })
  return (
    <>
      <SectionOne>
        <Container >
            <H1>" The Strategy we follow "</H1>
            {data.strategy.map((val)=>{
                return(
                    <Ol>
                        <Li>{val}</Li>
                    </Ol>
                )
            })}
        </Container>
    </SectionOne>
</>
  )
}

export default SecondSection


