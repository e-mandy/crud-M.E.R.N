import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Form } from './components/form/form'
import { Homepage } from './components/homepage/homepage'

function App() {
  const [count, setCount] = useState(0)
  function increment(){
    setCount(count + 1)
  }
  return (
    <>
      <Homepage></Homepage>
    </>
  )
}

export default App
