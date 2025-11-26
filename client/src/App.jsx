import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBotInt from './components/ChatBotInt'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<ChatBotInt/>
    </>
  )
}

export default App
