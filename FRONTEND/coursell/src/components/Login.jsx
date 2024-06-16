import React, { useState } from 'react'
import '../styles/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const response = await axios.post('http://localhost:3000/admin/login', {
      email: email,
      password: password
    })
    console.log(response)
    const data = response.data
    localStorage.setItem("token", data.token)
    navigate('/')
  }

  return (
    <div className='login'>
        <h2>Login</h2>
        <div className="input-fields">
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' onClick={handleClick}>Login</button>            
        </div>
    </div>
  )
}

export default Login