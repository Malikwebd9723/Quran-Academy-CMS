import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import styled from "styled-components";
const host = "http://localhost:4000"


const Main = styled.section`
min-height: 74vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: var(--white);
`
const H1 = styled.h1`
font-size: 40px;
color: var(--orange);
@media(max-width:800px){
  font-size: 30px;
}
`
const Container = styled.section`
  margin: 5px;
`
const Form = styled.form`
padding: 50px 20px;
min-width: 40%;
margin: 10px;
min-height: 100%;
border: 2px solid var(--orange);
border-radius: 20px;
  /* width: 40%; */
  background-color: var(--primary-bg);
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
padding: 5px;
color: var(--white);

`
const Input = styled.input`
padding: 5px;
background-color: var(--half-w);
border: none;
outline: none;
border-radius:10px;
margin: 5px;
`

const Submit = styled.button`
cursor: pointer;
border-radius: 10px;
background-color: var(--orange);
color: var(--primary-bg);
font-size: 18px;
padding: 5px 10px;
border: none;
  margin:5px auto;
`
const Link = styled.a`
color: var(--white);
text-align: center;
margin: 5px;
font-size: 12px;
display: block;
`

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate('/profile')
        }
    }, [])
    // use state to store login creds
    const [cred, setCred] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: cred.email,
                password: cred.password
            }),
        });

        const json = await response.json();

        if(json.success && json.admin){
            localStorage.setItem('token',json.authToken)
            localStorage.setItem('isAdmin',json.admin)
            navigate("/admindashboard")
        }
        else if(json.success){
            localStorage.setItem('token',json.authToken)
            navigate("/profile")
        }
        else{
            alert(json.message)
        }
    }

    // setting user creds in usestate
    const setUserCreds = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    // toggle password funstion

    const togglePassword = ()=>{
        const input =  document.getElementById("password");
        input.type === "password"?input.type = "text":input.type = "password"

    }
    return (
        <>
            <Main>
                    <H1>Login</H1>
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor='email'>Email:</Label>
                        <Input onChange={setUserCreds} value={cred.email} type='email' id='email' name='email' required/>

                        <Label htmlFor='password'>Password:</Label>
                        <Input onChange={setUserCreds} value={cred.password} type='password' id='password' name='password' required/>
                        
                        <Container>
                        <Input onClick={togglePassword} type='checkbox' id='showps'/>
                        <Label htmlFor='showps'>Show password</Label>
                        <Link as={NavLink} to="/forgotpassword">Forgot Password?</Link>
                        </Container>
                        <Submit>Login</Submit>
                        <Link as={NavLink} to="/registeration">not registered?</Link>
                    </Form>
            </Main>
        </>
    )
}

export default Login
