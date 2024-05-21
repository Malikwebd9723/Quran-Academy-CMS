import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import data from '../../assets/info/data'


const SectionOne = styled.section`
min-height: 100vh;
/* margin: 10vh 0; */
display: flex;
justify-content: center;
align-items: center;
`
const Container = styled.section`
padding: 10px 0;
width: 100%;
background-color: var(--white);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
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
border-radius: 50px;
  width: 95%;
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
const Radio = styled.input`
margin: 10px;

`
const Radios = styled.section`
  background-color: var(--primary-bg);
  border-radius: 10px;
  @media(max-width:500px){
    display: flex;
    flex-direction: column;
    min-width: 50%;
    justify-content: center;
    align-items: center;
  }
`
const Select = styled.select`
  padding: 5px;
  background-color: var(--half-w);
  border: none;
  border-radius:10px;
  margin: 5px;
`
const Option = styled.option`
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

const Registeration = () => {
  let navigate = useNavigate();
  // host for request
  const host = "http://localhost:4000"
  // check the applicant is teacher or student
  const [applicant, setApplicant] = useState("");
  const checkApplicant = (e) => {
    setApplicant(e.target.value)
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile');
    }
  })

  // function to get year for year of complition
  let year = []
  let yearNow = new Date().getFullYear()
  for (let i = 1970; i <= yearNow; i++) {
    year.push(i)
  }

  //function to register student
  const [studentCred, setStudentCred] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    address: "",
    yob: "",
    phone: "",
    field: "",
    zoom: "",
    skype: ""
  })
  const registerStudent = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/registeration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: studentCred.fname,
        lname: studentCred.lname,
        gender: studentCred.gender,
        email: studentCred.email,
        address: studentCred.address,
        phone: studentCred.phone,
        yob: studentCred.yob,
        field: studentCred.field,
        zoom: studentCred.zoom,
        skype: studentCred.skype
      }),
    });
    const json = await response.json();
    if (json.success) {
      alert(json.message)
      navigate("/")
    }
    else {
      alert(json.message)
    }
  }
  const setStudent = (e) => {
    setStudentCred({ ...studentCred, [e.target.name]: e.target.value })
  }

  // function to register teacher

  const [teacherCred, setTeacherCred] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    certification: "",
    yoc: "",
    lta: "",
    experiance: "",
    field: "",
    zoom: "",
    skype: ""
  });

  const registerTeacher = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname: teacherCred.fname,
        lname: teacherCred.lname,
        gender: teacherCred.gender,
        email: teacherCred.email,
        phone: teacherCred.phone,
        address: teacherCred.address,
        certification: teacherCred.certification,
        yoc: teacherCred.yoc,
        lta: teacherCred.lta,
        experiance: teacherCred.experiance,
        field: teacherCred.field,
        zoom: teacherCred.zoom,
        skype: teacherCred.skype
      }),
    });
    const json = await response.json();
    if (json.success) {
      alert(json.message)
      navigate("/")
    }
    else {
      alert(json.message)
    }
  };

  const setTeacher = (e) => {
    setTeacherCred({ ...teacherCred, [e.target.name]: e.target.value })
  };

  return (
    <>
      <SectionOne>
        <Container>
          <H1>Register Yourself Now</H1>
          <Para>Please provide the authentic details</Para>

          {/* A radio button on which we will change the form */}
          <Radios>
            <Label htmlFor='teacher'>Register as Teacher:</Label>
            <Radio required defaultChecked name='registerationtype' type='radio' id='teacher' value="teacher" onClick={checkApplicant} />

            <Label htmlFor='student'>Register as Student:</Label>
            <Radio required name='registerationtype' type='radio' id='student' value="student" onClick={checkApplicant} />
          </Radios>




          {/* here is the condition we checking the applicant is teacher or student First form is for Student and the Second form is for teacher*/}
          {applicant === "student" ?
            <Form onSubmit={registerStudent}>
              <Label htmlFor='fname'>First Name:</Label>
              <Input onChange={setStudent} value={studentCred.fname} type="text" id='fname' name='fname' required placeholder='e.g: my' />

              <Label htmlFor='lname'>Last Name:</Label>
              <Input onChange={setStudent} value={studentCred.lname} type="text" id='lname' name='lname' required placeholder='e.g: name' />

              <Label htmlFor='gender'>Gender:</Label>
              <Select onChange={setStudent} value={studentCred.gender} id='gender' name='gender'>
                <Option>Choose Gender</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
              <Label htmlFor='email'>Email:</Label>
              <Input onChange={setStudent} value={studentCred.email} type="email" id='email' name='email' required placeholder='e.g: your@email.com' />

              <Label htmlFor='address'>Address:</Label>
              <Input onChange={setStudent} value={studentCred.address} type="address" id='address' name='address' required placeholder='e.g: 12 st: anywhere in city' />
              <Label htmlFor='yob'>Year of birth:</Label>
              <Select onChange={setStudent} value={studentCred.yob} id='yob' name='yob'>
                {year.map((val) => {
                  return (
                    <>
                      <Option key={val} value={val}>{val}</Option>
                    </>
                  )
                })}
              </Select>
              <Label htmlFor='phone'>Phone:</Label>
              <Input onChange={setStudent} value={studentCred.phone} type="tel" id='phone' name='phone' required placeholder='e.g: +1234567890' />

              <Label htmlFor='field'>Choose the course:</Label>
              <Select onChange={setStudent} value={studentCred.course} id='field' name='field'>
                <Option>None</Option>
                {data.basicCourses.map((course) => {
                  return (
                    <Option key={course} value={course}>{course}</Option>
                  )
                })}
              </Select>

              <Label htmlFor='zoom'>Zoom Id:</Label>
              <Input onChange={setStudent} value={studentCred.zoom} type="text" id='zoom' name='zoom' required placeholder='e.g: abc123def456' />

              <Label htmlFor='skype'>Skype Id:</Label>
              <Input onChange={setStudent} value={studentCred.skype} type="text" id='skype' name='skype' required placeholder='e.g: 789ghi012jkl' />

              <Submit type='submit'>Apply</Submit>
              <Link as={NavLink} to="/login">already registered?</Link>

            </Form> :



            <Form onSubmit={registerTeacher}>
              <Label htmlFor='fname'>First Name:</Label>
              <Input onChange={setTeacher} value={teacherCred.fname} type="text" id='fname' name='fname' required placeholder='e.g: my' />

              <Label htmlFor='lname'>Last Name:</Label>
              <Input onChange={setTeacher} value={teacherCred.lname} type="text" id='lname' name='lname' required placeholder='e.g: name' />

              <Label htmlFor='gender'>Gender:</Label>
              <Select onChange={setTeacher} value={teacherCred.gender} id='gender' name='gender'>
                <Option>Choose Gender</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>

              <Label htmlFor='email'>Email:</Label>
              <Input onChange={setTeacher} value={teacherCred.email} type="email" id='email' name='email' required placeholder='e.g: your@email.com' />


              <Label htmlFor='address'>Address:</Label>
              <Input onChange={setTeacher} value={teacherCred.address} type="text" id='address' name='address' required placeholder='e.g: 12 st: anywhere in city' />

              <Label htmlFor='phone'>Phone:</Label>
              <Input onChange={setTeacher} value={teacherCred.phone} type="tel" id='phone' name='phone' required placeholder='e.g: +1234567890' />

              <Label htmlFor='certification'>Certification:</Label>
              <Input onChange={setTeacher} value={teacherCred.certification} type="text" id='certification' name='certification' required placeholder='e.g: Bachelour, Master etc' />

              <Label htmlFor='yoc'>Year of complition:</Label>
              <Select onChange={setTeacher} value={teacherCred.yoc} id='yoc' name='yoc'>
                <Option>choose year</Option>
                {year.map((val) => {
                  return (
                    <>
                      <Option key={val} value={val}>{val}</Option>
                    </>
                  )
                })}
              </Select>

              <Label htmlFor='lta'>Last teaching address:</Label>
              <Input onChange={setTeacher} value={teacherCred.lta} type="text" id='lta' name='lta' required placeholder='e.g: organizaiton name or link' />

              <Label htmlFor='experiance'>Experiance:</Label>
              <Input onChange={setTeacher} value={teacherCred.experiance} type="text" id='experiance' name='experiance' required placeholder='e.g: job duration, organization' />

              <Label htmlFor='field'>Choose teaching field:</Label>
              <Select onChange={setTeacher} value={teacherCred.field} id='field' name='field'>
                <Option>None</Option>
                {data.basicCourses.map((course) => {
                  return (
                    <Option key={course} value={course}>{course}</Option>
                  )
                })}
              </Select>

              <Label htmlFor='zoom'>Zoom Id:</Label>
              <Input onChange={setTeacher} value={teacherCred.zoom} type="text" id='zoom' name='zoom' required placeholder='e.g: abc123def456' />

              <Label htmlFor='skype'>Skype Id:</Label>
              <Input onChange={setTeacher} value={teacherCred.skype} type="text" id='skype' name='skype' required placeholder='e.g: 789ghi012jkl' />

              <Submit type='submit'>Apply</Submit>
              <Link as={NavLink} to="/login">already registered?</Link>
            </Form>}
        </Container>
      </SectionOne>
    </>
  )
}

export default Registeration
