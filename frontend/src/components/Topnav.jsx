import React from 'react'
import data from '../assets/info/data';
import styled from "styled-components"
import {NavLink,useNavigate} from"react-router-dom"
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

const Section = styled.section`
   background-color: var(--primary-bg);
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.section`
min-height: 10vh;
    color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
`
const Right = styled.section`
 height: 100%;
 @media (max-width:500px) {
  font-size: 13px;
}
`
const Left = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 10px;
padding: 10px;
border-radius: 50px;
color: var(--orange);
@media (max-width:500px) {
  font-size: 6px;
}
`
const Center = styled.section`
 height: 100%;
 @media (max-width:500px) {
  font-size: 10px;
}
`
const Button = styled.button`
  padding: 7px;
  margin: 5px;
  border: 1px solid var(--primary-bg);
  border-radius: 10px;
  background-color: var(--orange);
  color: var(--primary-bg);
  text-decoration: none;
  @media (max-width:500px) {
  font-size: 10px;
}
`
const Topnav = () => {
  const navigate = useNavigate();
  const Logout = ()=>{
    localStorage.clear();
      navigate("/");
  }
  return (
    <>
    <Section>
      <Container><Left><AutoStoriesOutlinedIcon fontSize='large'/>{data.logo}</Left> 
      <Center>إِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ</Center>
      <Right>{localStorage.getItem('token')?<Button onClick={Logout}>logout</Button>:<Button as={NavLink} to="/login">Login</Button>}</Right>
      </Container>
      </Section>
    </>
  )
}

export default Topnav
