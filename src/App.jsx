import { createContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Settings } from './Settings.jsx'
import { Home } from './Home.jsx'
import './App.css'


export const PomodoroContext = createContext();

function App() {

  const [w, setW] = useState(25)
  const [r, setR] = useState(5)

  const [count, setCount] = useState(w * 60 * 1000);       // 25 min
  // const [count, setCount] = useState(1000);       // 25 min

  const [breakDuration, setBreakDuration] = useState(r * 60 * 1000); // 5 min
  // const [breakDuration, setBreakDuration] = useState(3000); // 5 min

  return (
    <PomodoroContext.Provider value={{ w, setW, r, setR, count, setCount, breakDuration, setBreakDuration }}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </PomodoroContext.Provider>
  )
}

export default App
