import React from 'react'
import styled from "styled-components"
import bgimg from "../../assets/images/bgSecOne.jpg"
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import MosqueIcon from '@mui/icons-material/Mosque';
import NoFoodIcon from '@mui/icons-material/NoFood';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BalconyIcon from '@mui/icons-material/Balcony';


//start section three
const SectionThree = styled.section`
background-image: url(${bgimg});
background-position: center;
  background-attachment:fixed;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin: 10% 0;
  color: var(--white);

`;
const Piller = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--orange);
  padding: 3%;
  margin: 2%;
  border-radius: 50%;
  transition: all ease-out 0.6s;
  font-size: 10px;
  min-width: 60px;
  &:hover{
    font-size:20px ;
    background-color: var(--brown);
    margin: 1%;
    color:white
  }

`;
const Pillers = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const ThirdSection = () => {
  return (
    <>
              {/* section three */}
              <SectionThree>
          <Pillers>
            <Piller><PanToolAltIcon />Touheed</Piller>
            <Piller><MosqueIcon />Salah</Piller>
            <Piller><NoFoodIcon />Sowm</Piller>
            <Piller><VolunteerActivismIcon />Zakah</Piller>
            <Piller><BalconyIcon />Haaj</Piller>
          </Pillers>
        </SectionThree>
    </>
  )
}

export default ThirdSection
