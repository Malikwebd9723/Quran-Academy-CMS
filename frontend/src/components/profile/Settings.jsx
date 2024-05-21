import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import bgimg from "../../assets/images/bgSecOne.jpg"
import Context from '../../context/Context'
import { useNavigate } from 'react-router-dom'

const Main = styled.section`
    min-height: 75vh;
    background-image: url(${bgimg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    color: var(--white);
    flex: 4;
`
const Container = styled.section`
margin-top: 2%;
border-bottom: 1px solid var(--white);
`
const InnerContainer = styled.section`
`
const H1 = styled.h1`
background-color: var(--primary-bg);
width: 50%;
margin: 1% 0 0 0;
text-align: center;
padding: 1%;
border-radius: 0 10px 10px 0;
@media(max-width:500px){
width: 80%;
}
`
const H5 = styled.h5`
    margin: 5px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(5px);
`
const Label = styled.label`
padding: 5px;
display: block;
`
const Input = styled.input`
margin: 5px;
padding: 3px;
outline: none;
border-radius: 10px;
border: 1px solid var(--orange);
background-color: var(--primary-bg);
color: var(--white);
`
const Button = styled.button`
  padding: 7px;
  margin: 1%;
  border: 1px solid var(--primary-bg);
  border-radius: 10px;
  background-color: var(--orange);
  color: var(--primary-bg);
  max-width: 90px;
`
const Settings = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
          navigate("/login")
        }

    }, [])
    const context = useContext(Context)
    const { updatePassword,updateEmail } = context;


    // state for getting user password and new password
    const [password, setPassword] = useState({
        password: "",
        newpassword: ""
    });

    //Function to set state onchange
    const onChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }
    // password update function
    const passwordUpdater= async(e)=>{
        e.preventDefault();
        await updatePassword({password:password.password,newpassword:password.newpassword})
        navigate('/profile')
    }


    // email updation start here
        // state for getting user password and new password
        const [email, setEmail] = useState({
            email: ""
        });
    
        //Function to set state onchange
        const changeEmail = (e) => {
            setEmail({ ...email, [e.target.name]: e.target.value })
        }
        // password update function
        const emailUpdater= async(e)=>{
            e.preventDefault();
            await updateEmail({email:email.email})
            navigate('/profile')
        }

    return (
        <>
            <Main>
                <H1>Settings</H1>
                <Container>
                    <H5>Change password:</H5>
                    <Form onSubmit={passwordUpdater}>
                    <InnerContainer>
                        <Label htmlFor='password'>Old password:</Label>
                        <Input required autocomplete="off" onChange={onChange} value={password.password} type='text' name='password' id='password' />
                    </InnerContainer>
                    <InnerContainer>
                        <Label htmlFor='newpassword'>New Password:</Label>
                        <Input required autocomplete="off" onChange={onChange} value={password.newpassword} type='text' name='newpassword' id='newpassword' />
                    </InnerContainer>
                    <Button type='submit'>Update</Button>
                    </Form>
                </Container>


            {/* email updating section */}

                <Container>
                    <H5>Change email:</H5>
                    <Form onSubmit={emailUpdater}>
                    <InnerContainer>
                        <Label htmlFor='email'>Add E-mail address:</Label>
                        <Input required autocomplete="off" onChange={changeEmail} value={email.email} type='email' name='email' id='email' />
                    </InnerContainer>
                    <Button type='submit'>Add</Button>
                    </Form>
                </Container>
            </Main>
        </>
    )
}

export default Settings
