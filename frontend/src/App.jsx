import { useState } from 'react'
import './index.css'
import './App.css'
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
