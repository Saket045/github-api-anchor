/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ExplorePage from './pages/ExplorePage.jsx'
import LikesPage from './pages/LikesPage.jsx'
import Sidebar from './components/Sidebar.jsx'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div className='flex'>
   <Sidebar/>
   <div  className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignUpPage/>}/>
    <Route path="/explore" element={<ExplorePage/>}/>
    <Route path="/likes" element={<LikesPage/>}/>
   </Routes>
   <Toaster/>
   </div>
    </div>
  )
}

export default App
