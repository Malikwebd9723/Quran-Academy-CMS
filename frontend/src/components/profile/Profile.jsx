import { useState, useEffect, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import styled from "styled-components"
import Context from '../../context/Context'
import bgimg from "../../assets/images/bgSecOne.jpg"
import Modal from 'react-bootstrap/Modal';

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
const Loading = styled.section`
  text-align: center;
`
const Container = styled.section`

`
const InnerContainer = styled.section`
margin: 2%;
  @media(max-width:500px){
  padding:0px 10px;
  overflow: scroll;
}

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
const H4 = styled.h4`
  margin: 10px;
  font-size: 25px;
  color: var(--orange);
`
const H6 = styled.h6`
    margin: 3%;

`
const Table = styled.table`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 50px;
  color: var(--white);
`
const Tb = styled.tbody`
`
const Row = styled.tr`

`
const Disc = styled.td`
padding:5px;
font-size: 20px;
@media(max-width:500px){
  padding:5px;
font-size: 15px;
}
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
  padding: 5px;
  border: none;
  border-radius:10px;
  margin: 5px;
`
const Option = styled.option`
`

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [updateProfile, setUpdateProfile] = useState({
    id: "",
    fname: "",
    lname: "",
    gender:"",
    phone: "",
    address: "",
    zoom: "",
    skype: "",
  });
  const context = useContext(Context)
  const { userProfile, profile, editProfile } = context;

  // modal entities
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('token') && localStorage.getItem('isAdmin')) {
        navigate("/admindashboard")
      }
      else if (localStorage.getItem('token')) {
        userProfile();
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      }
      else {
        navigate("/login")
      }
    }, 1000)

  })

  const handleShow = () => {
    setShow(true)
    setUpdateProfile({ id: profile._id, fname: profile.fname, lname: profile.lname, gender:profile.gender, phone: profile.phone, address: profile.address, zoom: profile.zoom, skype: profile.skype })
  };
  const onChange = (e) => {
    setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value })
  }
  const updateFunction = async () => {
    setShow(false)
    await editProfile({ id: updateProfile.id, fname: updateProfile.fname, lname: updateProfile.lname, gender :updateProfile.gender, phone: updateProfile.phone, address: updateProfile.address, zoom: updateProfile.zoom, skype: updateProfile.skype })
    userProfile();
  }
  return (
    <>
      {/* medel to edit profile */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Updating profile...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContainer>
            <Label htmlFor='fname'>First Name:</Label>
            <Input required onChange={onChange} type='text' id='fname' name="fname" value={updateProfile.fname} />
            <Label htmlFor='lname'>Last Name:</Label>
            <Input required onChange={onChange} type='text' id='lname' name="lname" value={updateProfile.lname} />
            <Label htmlFor='gender'>Gender:</Label>
              <Select onChange={onChange} value={updateProfile.gender} id='gender' name='gender'>
                <Option value= "male">Male</Option>
                <Option value= "female">Female</Option>
                <Option value= "other">Other</Option>
              </Select>
            <Label htmlFor='phone'>Phone:</Label>
            <Input required onChange={onChange} type='tel' id='phone' name="phone" value={updateProfile.phone} />
            <Label htmlFor='address'>Address:</Label>
            <Input required onChange={onChange} type='text' id='address' name="address" value={updateProfile.address} />
            <Label htmlFor='zoom'>zoom:</Label>
            <Input required onChange={onChange} type='text' id='zoom' name="zoom" value={updateProfile.zoom} />
            <Label htmlFor='skype'>Skype:</Label>
            <Input required onChange={onChange} type='text' id='skype' name="skype" value={updateProfile.skype} />
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




      <Main>
        {isLoading ? <Loading>Loading...</Loading> :
          <>
            <Container>
              <H1>{profile.fname + " " + profile.lname}</H1>
              <H6>{profile.isAdmin ? "Admin" : profile.type}</H6>
            </Container>
            <InnerContainer>
              <H4>Personal Details</H4>
              <Table>
                <Tb>
                  <Row>
                    <Disc>First Name:</Disc>
                    <Disc>{profile.fname}</Disc>
                  </Row>

                  <Row>
                    <Disc>Last Name:</Disc>
                    <Disc>{profile.lname}</Disc>
                  </Row>

                  <Row>
                    <Disc>Gender:</Disc>
                    <Disc>{profile.gender}</Disc>
                  </Row>

                  <Row>
                    <Disc>Email:</Disc>
                    <Disc>{profile.email}</Disc>
                  </Row>

                  <Row>
                    <Disc>Phone:</Disc>
                    <Disc>{profile.phone}</Disc>
                  </Row>

                  <Row>
                    <Disc>Address:</Disc>
                    <Disc>{profile.address}</Disc>
                  </Row>

                  <Row>
                    <Disc>Field:</Disc>
                    <Disc>{profile.field}</Disc>
                  </Row>

                  <Row>
                    <Disc>Zoom ID:</Disc>
                    <Disc>{profile.zoom}</Disc>
                  </Row>

                  <Row>
                    <Disc>Skype ID:</Disc>
                    <Disc>{profile.skype}</Disc>
                  </Row>
                </Tb>
              </Table>
              <Button onClick={handleShow}>Edit Profile</Button>
            </InnerContainer>
          </>
        }
      </Main>
    </>
  )
}

export default Profile
