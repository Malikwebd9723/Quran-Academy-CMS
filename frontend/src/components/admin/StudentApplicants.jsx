import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import Context from '../../context/Context'
import styled from "styled-components"
// teacher container 
const Main = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex: 4;
  
`
const InnerContainer = styled.section`
  max-width: 49%;
  padding: 10px;
  color: var(--priamry-bg);
  border: 1px solid var(--primary-bg);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  margin: 3px 3px;
  @media(max-width:800px){
    max-width: 100%;
}

`
const H1 = styled.h1`
    width: 100%;
    font-size: 30px;
    text-align: center;
    padding: 10px;
    color: var(--primary-bg);

`
const H5 = styled.h5`
`
const Small = styled.small`
    color: var(--orange);
    background-color: var(--primary-bg);
    padding: 5px;
    border-radius: 5px;
    
`
const Detail = styled.aside`
display: flex;
flex-wrap: wrap;
padding: 10px;

`
const Para = styled.p`
    width: 50%;
    padding: 0 5px ;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;

`
const Span = styled.span`
`
const Button = styled.button`
  padding: 7px;
  margin: 5px;
  border: 1px solid var(--primary-bg);
  border-radius: 10px;
  background-color: var(--orange);
  color: var(--primary-bg);
`

const Label = styled.label`
  width: 100%;
  text-align: left;
  padding: 2%;
`
const Select = styled.select`
width: 90%;
margin: 5px;
padding: 7px;
background-color: var(--primary-bg);
color: var(--white);
border: 1px solid var(--orange);
border-radius: 10px;
`
const Option = styled.option`
`

const StudentApplicants = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('isAdmin')) {
      StudentApplicant()
      getTeachers()
    }
    else{
      navigate('/login')
  }
  })
  const context = useContext(Context)
  const {registerStudent, getTeachers, allTeachers, studentApplicant, StudentApplicant, deleteUser } = context;

  //registeration of student
  const [register,setRegister] = useState({
    teacher:""
  })

  const onChange = (e)=>{
    setRegister({...register,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(id)=>{
    await registerStudent({id,teacher:register.teacher})
    StudentApplicant();
  }


  // function to get year for year of complition
  let year = []
  let yearNow = new Date().getFullYear()
  for (let i = 1970; i <= yearNow; i++) {
    year.push(i)
  }


  // function to get date
  const GetDate = (date) => {
    const year = date.slice(0, 10);
    return year;
  }
  return (
    <>
      <Main>
        <H1>Students Applicant</H1>
        {studentApplicant.length === 0 && "No Applications"}
        {studentApplicant.map((val) => {
          return (
            <InnerContainer key={val}>
              <H5>{val.fname}{" "}{val.lname}</H5>
              <Small>Apply on {GetDate(val.date)}</Small>
              <Detail>
              <Para>
                  <Span>Gender:</Span>
                  <Span>{val.gender}</Span>
                </Para>
                <Para>
                  <Span>Email:</Span>
                  <Span>{val.email}</Span>
                </Para>
                <Para>
                  <Span>Phone:</Span>
                  <Span>{val.phone}</Span>
                </Para>
                <Para>
                  <Span>Address:</Span>
                  <Span>{val.address}</Span>
                </Para>
                <Para>
                  <Span>Year of birth:</Span>
                  <Span>{val.yob}</Span>
                </Para>
                <Para>
                  <Span>Field of study:</Span>
                  <Span>{val.field}</Span>
                </Para>
                <Para>
                  <Span>Zoom ID:</Span>
                  <Span>{val.zoom}</Span>
                </Para>
                <Para>
                  <Span>Skype ID:</Span>
                  <Span>{val.skype}</Span>
                </Para>

                <Label htmlFor='teacher'>Assign Teacher:</Label>
                <Select onChange={onChange} value={register.teacher} id='teacher' name='teacher' required>
                  <Option disabled value="">Select Teacher...</Option>
                  {allTeachers.map((val) => {
                    return (
                      <>
                        <Option key={val} value={val._id}>{val.fname}{" "}{val.lname}{"..("}{val.field}{")"}</Option>
                      </>
                    )
                  })}
                </Select>
              </Detail>
              <Button onClick={()=>handleSubmit(val._id)}>Register</Button>
              <Button style={{ backgroundColor: "#ae1818", color: "white" }} onClick={() => deleteUser(val._id)}>Delete</Button>
            </InnerContainer>
          )
        })}
      </Main>
    </>
  )
}

export default StudentApplicants