import { Route, Routes } from "react-router-dom"
import States from "./context/States";
import Navbar from './components/Navbar';
import Topnav from "./components/Topnav";
import FooterSection from "./components/FooterSection";
import Home from './components/home/Home';
import About from "./components/about/About";
import Programmes from "./components/programmes/Programmes"
import Contact from "./components/contact/Contact";
import Registeration from "./components/registeration/Registeration";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import AdminMenu from "./components/admin/Menu"
// admin and its childs
import AdminProfile from "./components/admin/AdminProfile"
import TeachersDetail from "./components/admin/TeachersDetail"
import StudentsDetail from "./components/admin/StudentsDetail"
import StudentApplicants from "./components/admin/StudentApplicants"
import TeacherApplicants from "./components/admin/TeacherApplicants"
// user and its childs
import UserMenu from "./components/profile/Menu";
import Attendance from "./components/profile/Attendance";
import Settings from "./components/profile/Settings";
import AdminSettings from "./components/admin/Settings";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetpassword/ResetPassword"
import ErrorPage from "./components/errorPage/Error"
import AdminLogin from "./components/adminregisteration/AdminRegisteration"
function App() {
  return (
    <>
      <States>
        <Topnav />
        <Navbar />
        <Routes>
        <Route exact path="/adminregisteration" element={<AdminLogin />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/programmes" element={<Programmes />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/registeration" element={<Registeration />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<UserMenu />}>
            <Route exact path="" element={<Profile />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route exact path="/admindashboard" element={<AdminMenu />}>
            <Route path="" element={<AdminProfile />} />
            <Route path="teachersdetail" element={<TeachersDetail />} />
            <Route path="studentsdetail" element={<StudentsDetail />} />
            <Route path="studentapplicants" element={<StudentApplicants />} />
            <Route path="teacherapplicants" element={<TeacherApplicants />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route exact path="*" element={<ErrorPage />} />

        </Routes>
        <FooterSection />
      </States>
    </>
  );
}

export default App;
