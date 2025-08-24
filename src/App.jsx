import './App.css'
import HomePage from './homepage/HomePage'
import { UserProvider } from './UserContext'

function App() {
  return (
    <>
      <UserProvider>
        <HomePage/>
      </UserProvider>
    </>
  )
}

export default App
