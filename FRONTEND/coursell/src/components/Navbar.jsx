import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')

  useEffect( () => {
    console.log("token - " + localStorage.getItem("token"));
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then((res) => {
        res.json()
        .then((data) => {
          if(data){
            console.log(data)
            setEmail(data.email)
          }
        })
      })
        
      .catch((err) => console.log(err))
  },)


  if (email) {
  return (
    <div className="navbar">
      <div className='left-navbar'>
        <div className='brand' onClick={() => {
          navigate('/')
        }}>
          Coursera
          </div>
        <div className="search-bar">
            <SearchIcon />
            <input type="text" />
        </div>
      </div>
      <div className="right-navbar">
        <button onClick={() => {
          localStorage.setItem("token", null)
          setEmail('')
          navigate('/')
        }}>
          Logout
        </button>
        <button onClick={() => {
          navigate('/create')
        }}>
          Create
        </button>
      </div>
    </div>
  )
  } else {
    return (
      <div className="navbar">
        <div className='left-navbar'>
          <div className='brand' onClick={() => {
            navigate('/')
          }}>
            Coursera
            </div>
          <div className="search-bar">
              <SearchIcon />
              <input type="text" />
          </div>
        </div>
        <div className="right-navbar">
          <button onClick={() => {
            navigate('/login')
          }}>
            Login
          </button>
          <button onClick={() => {
            navigate('/signup')
          }}>
            Signup
          </button>
          <button onClick={() => {
            navigate('/create')
          }}>
            Create
          </button>
        </div>
      </div>
    )
  }
    
}

export default Navbar