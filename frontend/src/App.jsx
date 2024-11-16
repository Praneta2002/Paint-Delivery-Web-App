import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import PaintItem from './components/PaintItem/PaintItem'
import ArtMasterpieceHunt from './components/ArtMasterpieceHunt/ArtMasterpieceHunt'
import AboutUs from './components/AboutUs/AboutUs'
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'
import Delivery from './components/Delivery/Delivery'
import ProfilePage from './components/ProfilePage/ProfilePage'

const App = () => {

  const url = "http://localhost:5000"

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/paintitem' element={<PaintItem/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='art-masterpiece-hunt' element={<ArtMasterpieceHunt/>} />
        <Route path='/about' element={<AboutUs />}/>
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path='/profilepage' element={<ProfilePage />} />


      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App
