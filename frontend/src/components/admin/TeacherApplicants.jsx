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
  border: 1px solid var(--primary-bg);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  margin: 2% 3px;
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

const TeacherApplicants = () => {
    const navigate = useNavigate();
        useEffect(() => {
            if (localStorage.getItem('token') && localStorage.getItem('isAdmin')) {
                TeacherApplicant()
            }
            else{
              navigate('/login')
          }

    }, [])
    const context = useContext(Context)
    const { teacherApplicant, TeacherApplicant, deleteUser, registerTeacher } = context;


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
    //funciton to register teachers
    const handleSubmit = async (id) => {
        await registerTeacher({id})
        TeacherApplicant()
    }
    return (
        <>
            <Main>
                <H1>Teachers Applicant</H1>
                {teacherApplicant.length === 0 && "No Applications"}
                {teacherApplicant.map((val) => {
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
                                    <Span>Certification:</Span>
                                    <Span>{val.certification}</Span>
                                </Para>
                                <Para>
                                    <Span>Year of completion:</Span>
                                    <Span>{val.yoc}</Span>
                                </Para>
                                <Para>
                                    <Span>Last teaching address:</Span>
                                    <Span>{val.lta}</Span>
                                </Para>
                                <Para>
                                    <Span>Experiance:</Span>
                                    <Span>{val.experiance}</Span>
                                </Para>
                                <Para>
                                    <Span>Field of teaching:</Span>
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

export default TeacherApplicants




{/* medel to edit profile */ }
    //   <Modal show={show} onHide={handleClose} animation={false}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Updating user...</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <ModalContainer>
    //         <Label htmlFor='fname'>First Name:</Label>
    //         <Input required onChange={onChange} type='text' id='fname' name="fname" value={update.fname} />

    //         <Label htmlFor='lname'>Last Name:</Label>
    //         <Input required onChange={onChange} type='text' id='lname' name="lname" value={update.lname} />

    //         <Label htmlFor='phone'>Phone:</Label>
    //         <Input required onChange={onChange} type='tel' id='phone' name="phone" value={update.phone} />

    //         <Label htmlFor='address'>Address:</Label>
    //         <Input required onChange={onChange} type='text' id='address' name="address" value={update.address} />

    //         <Label htmlFor='yob'>Year of Birth:</Label>
    //         <Select onChange={onChange} value={update.yob} id='yob' name='yob'>
    //           {year.map((val) => {
    //             return (
    //               <>
    //                 <Option key={val} value={val}>{val}</Option>
    //               </>
    //             )
    //           })}
    //         </Select>

    //         <Label htmlFor='field'>Field of study:</Label>
    //         <Select onChange={onChange} value={update.field} id='field' name='field'>
    //           {data.basicCourses.map((val) => {
    //             return (
    //               <>
    //                 <Option key={val} value={val}>{val}</Option>
    //               </>
    //             )
    //           })}
    //         </Select>

    //         <Label htmlFor='zoom'>zoom:</Label>
    //         <Input required onChange={onChange} type='text' id='zoom' name="zoom" value={update.zoom} />

    //         <Label htmlFor='skype'>Skype:</Label>
    //         <Input required onChange={onChange} type='text' id='skype' name="skype" value={update.skype} />

    //       </ModalContainer>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button onClick={handleClose}>
    //         Close
    //       </Button>
    //       <Button onClick={updateFunction}>
    //         update
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
