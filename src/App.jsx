import './App.css'
import { UserProvider } from './contexts/UserContext'
import { WebSocketProvider } from './contexts/WebSocketContext'
import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from './homepage/HomePage'
import GamePage from './gamepage/GamePage'

function App() {
  return (
    <>
      <UserProvider>
        <WebSocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/game" element={<GamePage/>}/>
            </Routes>
          </BrowserRouter>
        </WebSocketProvider>
      </UserProvider>
    </>
  )
}

export default App
