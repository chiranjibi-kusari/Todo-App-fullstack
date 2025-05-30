import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'
import { Toaster } from 'react-hot-toast';

function App() {

 const token= localStorage.getItem("jwt")
  return (
   <div>
  
   <Routes>
    <Route path='/' element={token?<Home />:<Navigate to={"/login"} />} />
    <Route path='/login' element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path='*' element={<PageNotFound />} />
   </Routes>
      <Toaster />

 
   </div>
  )
}

export default App
