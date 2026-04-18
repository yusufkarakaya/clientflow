import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './auth/login'
import { Register } from './auth/register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
