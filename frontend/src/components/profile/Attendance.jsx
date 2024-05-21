import { useState, useEffect, useContext } from 'react'
import styled from "styled-components"
import Context from '../../context/Context'
import bgimg from "../../assets/images/bgSecOne.jpg"
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
overflow: scroll;
`
const InnerContainer = styled.section`
backdrop-filter: blur(5px);
margin: 2%;
  @media(max-width:500px){
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 25px;
  color: var(--orange);
`
const H6 = styled.h6`
margin: 2%;

`
const Table = styled.table`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 50px;
  color: var(--white);
  backdrop-filter: blur(5px);
  `
const TableHead = styled.th`
`
const Tb = styled.tbody`
`
const Row = styled.tr`
`
const Disc = styled.td`
padding: 5px 20px;
/* font-size: 20px; */
@media(max-width:500px){
  font-size: 15px;
}
`
const Loading = styled.section`
  text-align:center;
`

// styling to student attendance section

const Button = styled.button`
background-color: var(--orange);
border: none;
padding: 5px;
border-radius: 10px;
margin: 5px;
`



const Attendance = () => {
  const navigate = useNavigate()
  const context = useContext(Context)
  const { userProfile, profile, attendance, getAttendance, getSpecificUser, specificUser, markPresent, markAbsent } = context;


  // get percentage
  const percentage = (pre) => {
    const present = pre.filter(val => val.status === 'Present');
    const percent = present.length / pre.length * 100
    const percentage = percent ? percent : 0;
    return percentage.toFixed(2);
  }

  //  get today date
  const fullDate = new Date();
  const today = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const date = `${today},${month + 1},${year}`;


  const [loading, setLoading] = useState(true)
  useEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        userProfile();
        setTimeout(() => {
          profile.type === "teacher" ? getSpecificUser() : getAttendance(profile._id);

          setTimeout(() => {
            setLoading(false)
          }, 1000);
        }, 1000);
      }
      else{
        navigate('/login')
      }
    } catch (err) {
      alert(err.message)
    }

  }, [profile])


  return (
    <Main>
      {loading ? <Loading>Loading...</Loading> :
        <>
          {profile.type === "teacher" ? <Container>
            <H1>Attendance</H1>
            <Table>
              <TableHead>
                <Disc>Name</Disc>
              </TableHead>
              <TableHead>
                <Disc>Course</Disc>
              </TableHead>
              <TableHead>
                <Disc>Percentage</Disc>
              </TableHead>
              <TableHead>
                <Disc>Mark</Disc>
              </TableHead>
              {specificUser.length > 0 ? specificUser.map((student) => {
                return (
                  <Tb key={student._id}>
                    <Row>
                      <Disc>{student.fname}{" "}{student.lname}</Disc>
                      <Disc>{student.field}</Disc>
                      <Disc>{percentage(student.attendence)}</Disc>
                      <Disc>
                        <Button style={{ backgroundColor: "red" }} onClick={() => markAbsent(student._id)} disabled={date === student.lastattendence ? true : false} >Absent</Button>
                        <Button disabled={date === student.lastattendence ? true : false} onClick={() => markPresent(student._id)}>Present</Button>
                      </Disc>
                    </Row>
                  </Tb>
                )
              }) : <Tb><Row><Disc>No user to display!</Disc></Row></Tb>}
            </Table>
          </Container> :
            <>
              <Container>
                <H1>{profile.fname + " " + profile.lname}</H1>
                <H6>{profile.isAdmin ? "Admin" : profile.type}</H6>
              </Container>
              <InnerContainer>
                <H4>Attendance {percentage(profile.attendence)}%</H4>
                <Table>
                  <Tb>
                    <Row>
                      <Disc>Date</Disc>
                      <Disc>Status</Disc>
                    </Row>
                    {attendance.length > 0 ? attendance.map((val) => {
                      return (
                        <Row>
                          <Disc>{val.date}</Disc>
                          <Disc>{val.status}</Disc>
                        </Row>

                      )
                    }) : <H6>No attendance to show!</H6>}
                  </Tb>
                </Table>
              </InnerContainer>
            </>
          }
        </>
      }
    </Main>
  )
}

export default Attendance
