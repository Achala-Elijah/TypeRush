import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Auth from './pages/Auth'
import Competition from './pages/Competition'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import useStore from './stores/Store'


const ProtectedRoutes = ({children}) => {
  const {userName} = useStore()
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!userName){
      navigate("/auth")
    }
  }, [userName, navigate])
  
  
  return(
      <>
          {children}
      </>
  )
}


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/game" element={<ProtectedRoutes> <Competition /> </ProtectedRoutes>}/>
          <Route path="*" element={<Auth />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
