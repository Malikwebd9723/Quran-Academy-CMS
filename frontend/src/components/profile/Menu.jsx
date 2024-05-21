import { useEffect } from 'react'
import styled from "styled-components"
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';

const Main = styled.section`
  min-height: 63.2vh;
  display: flex;
  flex: 1;
@media (max-width:800px){
      flex-direction: column;
    }

`
const Navbar = styled.section`
    background-color: var(--primary-bg);
    color:var(--white);
    border-top: 2px solid var(--orange);
    position: sticky;
    left: 0;
    flex: 1;
    @media (max-width:800px){
     display: none;
    }
`
const HamNav = styled.section`
  display: flex;
  text-align: center;
  color: var(--white);
  background-color: var(--primary-bg);
  padding: 2vh;
  margin: 0;
  border-top: 1px solid var(--orange);
`
const Icon = styled.span`
display: none;
    @media (max-width:800px){
     display: block;
    }
`
const H4 = styled.h4`
text-align: center;
background-color: var(--primary-bg);
color: var(--white);
padding: 10px;
margin: 0;
flex:2;
`
const H5 = styled.h5`
padding: 20px 10px 0px 10px;
`
const Links = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;
`
const Link = styled.a`
color: var(--white);
text-decoration: none;
border-left: 2px solid var(--white);
border-radius: 10px 0 0 0 ;
padding: 5px;
margin: 5px;
transition: all 0.5s ease;
&:hover{
  font-size: 20px;
}
`

const Menu = () => {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0,0)
      if (localStorage.getItem('token') && localStorage.getItem('isAdmin')) {
        navigate("/admindashboard")
      }
      else if (localStorage.getItem('token')) {
        navigate(window.history)
      }
      else {
        navigate("/login")
      }

  })
  // responsive navbar
  const ToogleNav = () => {
    const Navbar = document.getElementById('navbar');
    Navbar.style.display === "none" ? Navbar.style.display = "block" : Navbar.style.display = "none"
  }
  return (
    <>
      <HamNav>
        <H4>Profile</H4>
        <Icon id="menuicon" onClick={ToogleNav}>
          <MenuIcon fontSize='large' />
        </Icon>
      </HamNav>
      <Main>
        <Navbar id="navbar">
          <H5>
            User
          </H5>
          <Links>
            <Link as={NavLink} to="/profile">Profile</Link>
            <Link as={NavLink} to="/profile/attendance">Attendance</Link>
            <Link as={NavLink} to="/profile/settings">Settings</Link>

          </Links>
        </Navbar>
        <Outlet />
      </Main>
    </>
  )
}

export default Menu
