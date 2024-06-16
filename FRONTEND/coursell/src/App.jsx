import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Homepage from './components/Homepage'
import Create from './components/Create'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Edit from './components/Edit'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Homepage /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/create' element={ <Create /> } />
          <Route path='/course/:courseid' element={ <Edit /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App 
