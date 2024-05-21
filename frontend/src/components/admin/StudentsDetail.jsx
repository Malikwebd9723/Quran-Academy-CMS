import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import Context from '../../context/Context'
import styled from "styled-components"
import Modal from 'react-bootstrap/Modal';
import data from '../../assets/info/data';
// teacher container 
const StudentContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex: 4;
  
`
const Student = styled.section`
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

// modal entities
const ModalContainer = styled.section`
background-color: var(--primary-bg);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px 5px;
border: 2px solid var(--orange);
border-radius: 20px;
border-style: dashed;
`
const Label = styled.label`
  color: var(--orange);
  width: 100%;
  text-align: left;
  padding: 5px 25px;
`
const Input = styled.input`
width: 90%;
margin: 5px;
padding: 7px;
border: 1px solid var(--primary-bg);
border-radius: 10px;
`
const Select = styled.select`
width: 90%;
margin: 5px;
padding: 7px;
border: 1px solid var(--primary-bg);
border-radius: 10px;
`
const Option = styled.option`
`

const StudentsDetail = () => {
  const navigate = useNavigate();
  useEffect(() => {
      if (localStorage.getItem('token') && localStorage.getItem('isAdmin')) {
        getStudents()
      }
      else {
          navigate('/login')
      }

  }, [])
  const context = useContext(Context)
  const { getStudents, allStudents, deleteUser, updateUser } = context;


  // function to get year for year of complition
  let year = []
  let yearNow = new Date().getFullYear()
  for (let i = 1970; i <= yearNow; i++) {
    year.push(i)
  }


  // function to get date
  const GetDate = (date) => {
    const year = date.slice(0, 4);
    return year;
  }

  // modal entities
  const [update, setUpdate] = useState({
    id: "",
    fname: "",
    lname: "",
    gender:"",
    phone: "",
    address: "",
    yob: "",
    field: "",
    zoom: "",
    skype: "",
  });


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (val) => {
    setShow(true)
    setUpdate({ id: val._id, fname: val.fname, lname: val.lname, gender: val.gender, phone: val.phone, address: val.address, yob: val.yob, field: val.field, zoom: val.zoom, skype: val.skype })
  };
  const onChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value })
  }
  const updateFunction = async () => {
    setShow(false)
    await updateUser({ id: update.id, fname: update.fname, lname: update.lname, gender: update.gender, phone: update.phone, address: update.address, yob: update.yob, field: update.field, zoom: update.zoom, skype: update.skype })
    getStudents();
  }

  return (
    <>

      {/* medel to edit profile */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Updating user...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContainer>
            <Label htmlFor='fname'>First Name:</Label>
            <Input required onChange={onChange} type='text' id='fname' name="fname" value={update.fname} />

            <Label htmlFor='lname'>Last Name:</Label>
            <Input required onChange={onChange} type='text' id='lname' name="lname" value={update.lname} />

            <Label htmlFor='gender'>Gender:</Label>
              <Select onChange={onChange} value={update.gender} id='gender' name='gender'>
                <Option value= "male">Male</Option>
                <Option value= "female">Female</Option>
                <Option value= "other">Other</Option>
              </Select>

            <Label htmlFor='phone'>Phone:</Label>
            <Input required onChange={onChange} type='tel' id='phone' name="phone" value={update.phone} />

            <Label htmlFor='address'>Address:</Label>
            <Input required onChange={onChange} type='text' id='address' name="address" value={update.address} />

            <Label htmlFor='yob'>Year of Birth:</Label>
            <Select onChange={onChange} value={update.yob} id='yob' name='yob'>
              {year.map((val) => {
                return (
                  <>
                    <Option key={val} value={val}>{val}</Option>
                  </>
                )
              })}
            </Select>

            <Label htmlFor='field'>Field of study:</Label>
            <Select onChange={onChange} value={update.field} id='field' name='field'>
              {data.basicCourses.map((val) => {
                return (
                  <>
                    <Option key={val} value={val}>{val}</Option>
                  </>
                )
              })}
            </Select>

            <Label htmlFor='zoom'>zoom:</Label>
            <Input required onChange={onChange} type='text' id='zoom' name="zoom" value={update.zoom} />

            <Label htmlFor='skype'>Skype:</Label>
            <Input required onChange={onChange} type='text' id='skype' name="skype" value={update.skype} />

          </ModalContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
          <Button onClick={updateFunction}>
            update
          </Button>
        </Modal.Footer>
      </Modal>






      <StudentContainer>
        <H1>Students Detail</H1>
        {allStudents.length === 0 && "No students to show!"}
        {allStudents.map((val) => {
          return (
            <Student key={val}>
              <H5>{val.fname}{" "}{val.lname}</H5>
              <Small>Member since {GetDate(val.date)}</Small>
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
              </Detail>
              <Button onClick={() => handleShow(val)}>Update</Button>
              <Button style={{ backgroundColor: "#ae1818", color: "white" }} onClick={() => deleteUser(val._id)}>Delete</Button>
            </Student>
          )
        })}
      </StudentContainer>
    </>
  )
}

export default StudentsDetail
