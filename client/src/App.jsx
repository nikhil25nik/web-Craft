import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Generate from './pages/Generate'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import WebsiteEditor from './pages/Editor'
import Site from './pages/Site'
import Pricing from './pages/Pricing'
export const serverUrl = "https://web-craft-zeta-ecru.vercel.app"


const App = () => {
  useGetCurrentUser()
  const userData = useSelector(state=>state.user);
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/generate' element={userData ? <Generate/>:<Home/>}/>
      <Route path='/dashboard' element={userData ? <Dashboard/>:<Home/>}/>
      <Route path='/editor/:id' element={userData ? <WebsiteEditor/>:<Home/>}/>
      <Route path='/site/:slug' element={<Site/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
