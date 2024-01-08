import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Lobby from './pages/Lobby'
import BottomNavigation from './components/BottomNavigation'
import Header from './components/Header'
import styled from "styled-components"

const App = () => {
  const Stage = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  `
  return (
    <Stage>
      <Header />
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Lobby />} />
            {/* <Route path="/room/:rid" element={<Game />} />
            <Route path="/test" element={<MyComponent />} /> */}
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
      <BottomNavigation />
    </Stage>
  )
}

export default App;
