import React, { useEffect, useState } from 'react'
import  axios from 'axios'
import '../styles/Create.css'

const Create = () => {

  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [creator, setCreator] = useState('')

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
  },[])


  const handleClick = async () => {
    try {
      const res = await axios.post('http://localhost:3000/admin/create', {
        title: title,
        image: image,
        creator: creator
      }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      console.log(res)
      alert('Success')
      
    } catch (error) {
      console.log(error)
      alert('Opps! Something went wrong.')
    }
    

  }

  

  if (email) {
    return (
      <div className='create'>
          <h2>Create</h2>
          <div className="input-fields">
              <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
              <input type="text" placeholder='Image Link' onChange={(e) => setImage(e.target.value)}/>
              <input type="text" placeholder='Creator' onChange={(e) => setCreator(e.target.value)}/>
              <button type='submit' onClick={handleClick}>Create</button>            
          </div>
      </div>
    )

  } else {
    return(
      <h3>Loading....</h3>
    )
  }
}

export default Create