import './App.css'
import HomePage from './homepage/HomePage'
import { UserProvider } from './contexts/UserContext'
import { WebSocketProvider } from './contexts/WebSocketContext'

function App() {
  return (
    <>
      <UserProvider>
        <WebSocketProvider>
          <HomePage/>
        </WebSocketProvider>
      </UserProvider>
    </>
  )
}

export default App
