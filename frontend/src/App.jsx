import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'

function App() {
  return (
   <div>
  
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path='*' element={<PageNotFound />} />
   </Routes>

 
   </div>
  )
}

export default App
