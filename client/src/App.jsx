import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Auth from './pages/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="">
       <Auth />
      </div>
    </>
  )
}

export default App
