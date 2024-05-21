import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"


const SectionOne = styled.section`
background-color: var(--white);
min-height: 75vh;
/* margin: 10vh 0; */
display: flex;
justify-content: center;
align-items: center;
`
const Container = styled.section`
padding: 10px 0;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const ShowPassword = styled.section`
`
const H1 = styled.h1`
font-size: 40px;
color: var(--orange);
@media(max-width:800px){
  font-size: 30px;
}
`
const Para = styled.p`
  margin: 5px;
`
const Form = styled.form`
padding: 20px;
margin: 10px;
border: 2px solid var(--orange);
border-radius: 20px;
  min-width: 40%;
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
`

const AdminRegisteration = () => {
    let navigate = useNavigate();
    // host for request
    const host = "http://localhost:4000"

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/profile');
        }
    })


    //function to register student
    const [adminCred, setAdminCred] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    })
    const registerAdmin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/adminregisteration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname: adminCred.fname,
                lname: adminCred.lname,
                email: adminCred.email,
                password: adminCred.password
            }),
        });
        const json = await response.json();
        if (json.success) {
            alert(json.message)
            navigate("/login")
        }
        else {
            alert(json.message)
        }
    }
    const onChange = (e) => {
        setAdminCred({ ...adminCred, [e.target.name]: e.target.value })
    }

    // toggle password funstion

    const togglePassword = () => {
        const input = document.getElementById("password");
        input.type === "password" ? input.type = "text" : input.type = "password"

    }

    return (
        <>
            <SectionOne>
                <Container>
                    <H1>Admin registeration </H1>
                    <Para>Please provide the authentic details</Para>



                    <Form onSubmit={registerAdmin}>
                        <Label htmlFor='fname'>First Name:</Label>
                        <Input onChange={onChange} value={adminCred.fname} type="text" id='fname' name='fname' required placeholder='i am' />

                        <Label htmlFor='lname'>Last Name:</Label>
                        <Input onChange={onChange} value={adminCred.lname} type="text" id='lname' name='lname' required placeholder='admin' />

                        <Label htmlFor='email'>Email:</Label>
                        <Input onChange={onChange} value={adminCred.email} type="email" id='email' name='email' required placeholder='your@email.com' />

                        <Label htmlFor='password'>password:</Label>
                        <Input onChange={onChange} value={adminCred.password} type="password" id='password' name='password' required placeholder='strong password' />
                        <ShowPassword>
                            <Input onClick={togglePassword} type='checkbox' id='showps' />
                            <Label htmlFor='showps'>Show password</Label>
                        </ShowPassword>
                        <Submit type='submit'>Apply</Submit>
                        <Link as={NavLink} to="/login">already registered?</Link>

                    </Form>
                </Container>
            </SectionOne>
        </>
    )
}

export default AdminRegisteration
