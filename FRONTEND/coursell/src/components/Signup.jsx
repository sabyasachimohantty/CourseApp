import React, { useState } from 'react'
import '../styles/Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signup = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = async () => {
    const res = await axios.post('http://localhost:3000/admin/signup', {
      username: username,
      email: email,
      password: password
    })
    
    if (res.status === 409){
      alert('User already exists!')
    } else {     
      navigate('/login')
    }

  }

  return (
    <div className='signup'>
        <h2>SignUp</h2>
        <div className="input-fields">
            <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' onClick={handleClick}>Sign Up</button>
            
        </div>
    </div>
  )
}

export default Signup