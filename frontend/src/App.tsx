import './App.css'
import './index.css'

import { Route, Routes, useLocation } from 'react-router-dom'
import { NavBar, Footer, AllRooms, ContactUs, AboutUs, GetStarted, Login, SignUp, RoomDetails, Book, Profile } from './components'
import ProtectedRoute from './components/ProtectedRoute'
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
        <Route
          path="/allRooms"
          element={
            <ProtectedRoute>
              <AllRooms />
            </ProtectedRoute>
          }
        />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/rooms/:id"
          element={
            <ProtectedRoute>
              <RoomDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      {showNavFooter && <Footer />}
       
    </>
  )
}

export default App
