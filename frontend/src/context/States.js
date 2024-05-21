import { useState } from "react"
import Context from "./Context";


const States = (props) => {
  const host = "http://localhost:4000";
  const initialUser = [];
  const [profile, setProfile] = useState(initialUser);
  const [allTeachers, setAllTeachers] = useState(initialUser);
  const [allStudents, setAllStudents] = useState(initialUser);
  const [studentApplicant, setStudentApplicant] = useState(initialUser);
  const [teacherApplicant, setTeacherApplicant] = useState(initialUser);
  const [attendance, setAttendance] = useState(initialUser);
  const [specificUser, setSpecificUser] = useState(initialUser);



  // route for user to get profile
  const userProfile = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const response = await fetch(`${host}/api/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`,
        },
      });
      const json = await response.json();
      await setProfile(json)
    } catch (error) {
      alert(error.message)
    }
  }


  //route for user to update profile
  const editProfile = async ({
    id,
    fname,
    lname,
    phone,
    address,
    zoom,
    skype
  }) => {
    try {
      const authToken = await localStorage.getItem("token");
      const response = await fetch(`${host}/api/users/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`
        },
        body: JSON.stringify({
          fname,
          lname,
          phone,
          address,
          zoom,
          skype
        })
      })
      response.json()
    } catch (error) {
      alert(error.message)
    }

  }

  // get all the teachers
  const getTeachers = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const respose = await fetch(`${host}/api/users/allteachers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`,
        },
      })
      const json = await respose.json();
      setAllTeachers(json)
    } catch (error) {
      alert(error.message)
    }
  }

  // get all students
  const getStudents = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const response = await fetch(`${host}/api/users/allstudents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`,
        },
      })
      const json = await response.json();
      setAllStudents(json)
    } catch (error) {
      alert(error.message)
    }
  }


  // get all applicant students
  const StudentApplicant = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const respose = await fetch(`${host}/api/users/studentapplicant`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`,
        },
      })
      const json = await respose.json();
      setStudentApplicant(json)
    } catch (error) {
      alert(error.message)
    }
  }

  // get all applicant teachers
  const TeacherApplicant = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const respose = await fetch(`${host}/api/users/teacherapplicant`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`,
        },
      })
      const json = await respose.json();
      setTeacherApplicant(json)
    } catch (error) {
      alert(error.message)
    }
  }


  //updation of any user by admin 
  const updateUser = async ({
    id,
    fname,
    lname,
    gender,
    address,
    phone,
    certification,
    yoc,
    lta,
    field,
    yob,
    experiance,
    zoom,
    skype,
  }) => {
    try {
      const authToken = await localStorage.getItem('token');
      const response = await fetch(`${host}/api/users/updateuser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`
        },
        body: JSON.stringify({
          fname,
          lname,
          gender,
          address,
          phone,
          certification,
          yoc,
          lta,
          field,
          yob,
          experiance,
          zoom,
          skype
        })
      })
      response.json()
    } catch (error) {
      alert(error.message)
    }
  }

  //register a student who apply for registeration
  const registerStudent = async ({ id, teacher }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`${host}/api/registerstudent/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`,
        },
        body: JSON.stringify({
          teacher,
        })
      });
      const json = await response.json()
      alert(json)
    } catch (error) {
      alert(error.message)
    }
  }

  //register a teacher who apply for registeration
  const registerTeacher = async ({ id }) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await fetch(`${host}/api/registerteacher/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`,
        }
      });
      const json = await response.json()
      alert(json)
    } catch (error) {
      alert(error)
    }
  }

  // delete user 
  const deleteUser = async (id) => {
    const deletion = await prompt("To delete user say 'yes'");
    if (deletion === "yes") {
      try {
        const authToken = await localStorage.getItem('token');
        const response = await fetch(`${host}/api/users/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${authToken}`
          },
        });
        const json = await response.json()
        alert(json)
      } catch (error) {
        alert(error.message);
      }
    }
    else {
      alert("Not deleted")
    }
  }

  // get attendance
  const getAttendance = async (id) => {
    try {
      const response = await fetch(`${host}/api/attendance/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const json = await response.json();
      await setAttendance(json)
    } catch (error) {
      alert(error.message)
    }
  }

  // get specific users for attendance
  const getSpecificUser = async () => {
    try {
      const authToken = await localStorage.getItem('token');
      const response = await fetch(`${host}/api/users/studentattendance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${authToken}`
        },
      });
      const json = await response.json();
      setSpecificUser(json);
    } catch (error) {
      alert(error.message)
    }
  }

  // mark the student present
  const markPresent = async (id) => {
    try {
      const authToken = await localStorage.getItem('token');
      const response = await fetch(`${host}/api/attendance/inc/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "auth-token": `${authToken}`
        },

      });
      const json = await response.json()
      alert(json)
    } catch (error) {
      alert(error.message)
    }
  }

  // mark the student absent
  const markAbsent = async (id) => {
    try {
      const authToken = await localStorage.getItem('token');
      const response = await fetch(`${host}/api/attendance/dec/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "auth-token": `${authToken}`
        },

      });
      const json = await response.json()
      alert(json)
    } catch (error) {
      alert(error.message)
    }
  }

  // update password functionality
  const updatePassword = async({password, newpassword})=>{
    try {
      const authToken = await localStorage.getItem('token');
      const response = await fetch(`${host}/api/users/updatepassword`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "auth-token":`${authToken}`
        },
        body:JSON.stringify({
          password,
          newpassword
        })
      })
      const json = await response.json();
      alert(json)
    } catch (error) {
      alert(error.message)
    }
  }

  // function to update email

  const updateEmail = async({email})=>{
    try {
      const authToken = await localStorage.getItem('token');
      const response = await fetch(`${host}/api/users/updateemail`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "auth-token":`${authToken}`
        },
        body:JSON.stringify({
          email
        })
      })
      const json = await response.json();
      alert(json)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Context.Provider
      value={{ profile, userProfile, editProfile, getTeachers, allTeachers, getStudents, allStudents, studentApplicant, StudentApplicant, updateUser, deleteUser, TeacherApplicant, teacherApplicant, registerStudent, registerTeacher, getAttendance, attendance, getSpecificUser, specificUser, markPresent, markAbsent,updatePassword,updateEmail }}
    >
      {props.children}
    </Context.Provider>
  )
};

export default States;