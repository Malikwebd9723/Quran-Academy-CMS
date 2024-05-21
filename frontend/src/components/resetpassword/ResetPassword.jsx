import React, { useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
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

const ResetPassword = () => {
    const navigate = useNavigate();
    const {id,token} = useParams()
    // use state to store login creds
    const [cred, setCred] = useState({
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/users/resetPassword/${id}/${token}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: cred.password
            }),
        });

        const json = await response.json();
        if (json.success) {
            setCred({password:""})
            navigate('/login')
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

    const togglePassword = () => {
        const input = document.getElementById("password");
        input.type === "password" ? input.type = "text" : input.type = "password"

    }
    return (
        <>
            <Main>
                <H1>Reset Password</H1>
                <Form onSubmit={handleSubmit}>
                    <Para>Please enter the strong password!</Para>
                    <Label htmlFor='password'>Enter Password:</Label>
                    <Input autoComplete='false' onChange={setUserCreds} value={cred.password} type='password' id='password' name='password' required />
                    <Container>
                        <Input onClick={togglePassword} type='checkbox' id='showps' />
                        <Label htmlFor='showps'>Show password</Label>
                    </Container>
                    <Submit>Update</Submit>
                </Form>
            </Main>
        </>
    )
}

export default ResetPassword
