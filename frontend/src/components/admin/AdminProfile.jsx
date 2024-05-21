import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import Context from '../../context/Context'
import Modal from 'react-bootstrap/Modal';

const Main = styled.section`
    flex: 4;
    `
const Profile = styled.section`
color: var(--primary-bg);
backdrop-filter: blur(7px);
  height: 100%;
  @media(max-width:800px){
}
`
const Table = styled.table`
width: 100%;
`
const Row = styled.tr`
padding: 5px;
display: flex;
flex-wrap: wrap;
padding-left: 10%;
`
const Disc = styled.td`
margin: 5px;
overflow: scroll;
padding-left: 10px;
`


const Loading = styled.section`
padding-left: 10%;
`
const Container = styled.section`
`
const InnerContainer = styled.section`
  @media(max-width:800px){
  padding:0px 10px;
  overflow: scroll;
}

`
const H1 = styled.h1`
  font-size: 30px;
  background-color: var(--primary-bg);
  color: var(--white);
  width: 50%;
  text-align: center;
  padding: 2%;
  margin-top: 1%;
  border-radius: 0 10px 5px 0;
  @media(max-width:800px){
    width: 80%;
}
`
const H4 = styled.h4`
padding-left: 10%;
`

const Button = styled.button`
  padding: 7px;
  margin: 5px;
  border: 1px solid var(--primary-bg);
  border-radius: 10px;
  background-color: var(--orange);
  color: var(--primary-bg);
  margin-left: 10%;
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

const AdminProfile = () => {
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
  const { userProfile, profile, editProfile, getTeachers } = context;

  // modal entities
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('token') && localStorage.getItem("isAdmin")) {
        userProfile();
        getTeachers();
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
    setUpdateProfile({ id: profile._id, fname: profile.fname, lname: profile.lname, gender: profile.gender, phone: profile.phone, address: profile.address, zoom: profile.zoom, skype: profile.skype })
  };
  const onChange = (e) => {
    setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value })
  }
  const updateFunction = async () => {
    setShow(false)
    await editProfile({ id: updateProfile.id, fname: updateProfile.fname, lname: updateProfile.lname, gender: profile.gender, phone: updateProfile.phone, address: updateProfile.address, zoom: updateProfile.zoom, skype: updateProfile.skype })
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
        <Profile>
          {isLoading ? <Loading>Loading...</Loading> :
            <>
            <H1>{profile.fname + " " + profile.lname}</H1>
              <Container>
                <Row>{profile.isAdmin ? "Admin" : profile.type}</Row>
              </Container>
              <InnerContainer>
                <H4>Details:</H4>
                <Table>

                <Row>
                  <Disc>First Name:</Disc><Disc>{profile.fname}</Disc>
                </Row>

                <Row>
                  <Disc>Last Name:</Disc><Disc>{profile.lname}</Disc>
                </Row>

                <Row>
                  <Disc>Email:</Disc>
                  <Disc>{profile.email}</Disc>
                </Row>
                </Table>
                <Button onClick={handleShow}>Edit Profile</Button>
              </InnerContainer>
            </>
          }
        </Profile>
      </Main>
    </>
  )
}

export default AdminProfile
