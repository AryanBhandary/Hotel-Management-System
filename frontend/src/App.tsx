import './App.css'

import { Route, Routes, useLocation } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AllRooms from './pages/AllRooms'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import ContactUs from './components/ContactUs/ContactUs'
import AboutUs from './components/AboutUs/AboutUs'
import RoomDetails from './components/ExploreRooms/RoomDetails'
import ScrollToTop from './hooks/ScrollToTop'

function App() {
  const location = useLocation()

  const noNavFooter = ["/login", "/signup"]
  const showNavFooter = !noNavFooter.includes(location.pathname)

  return (
    <>
    <ScrollToTop />

      {showNavFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/allRooms" element={<AllRooms />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
      </Routes>
      {showNavFooter && <Footer />}
      
    </>
  )
}

export default App
