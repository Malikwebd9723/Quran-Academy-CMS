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
const Para = styled.p`
    color: var(--white);
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

const ForgotPassword = () => {
    const navigate = useNavigate();
    useEffect(() => {

    }, [])
    // use state to store login creds
    const [cred, setCred] = useState({
        email: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/users/forgotpassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: cred.email
            }),
        });

        const json = await response.json();
        alert(json)
    }

    // setting user creds in usestate
    const setUserCreds = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Main>
                    <H1>Forgot Password</H1>
                    <Form onSubmit={handleSubmit}>
                        <Para>Please enter the correct email address!</Para>
                        <Label htmlFor='email'>Your Email:</Label>
                        <Input onChange={setUserCreds} value={cred.email} type='email' id='email' name='email' required/>

                        <Submit>Send</Submit>
                    </Form>
            </Main>
        </>
    )
}

export default ForgotPassword
