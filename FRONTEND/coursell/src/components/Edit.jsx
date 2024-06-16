import React, { useEffect, useState } from 'react'
import '../styles/Edit.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Edit = () => {

  const { courseid } = useParams();
  const [course, setCourse] = useState(null);
  

  useEffect(() => {
    console.log(courseid)
    axios.get("http://localhost:3000/admin/course/" + courseid, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(res => {
        setCourse(res.data);
        console.log(course._id)
        
    }).catch((err) => {
        console.log(err)
    });
    }, []);


    

  if (!course) {
    return(
      <h3>Loading...</h3>
    )
    
  } else {
      
      return (
        <UpdateCourse course={course} courseid={courseid} />
      )
  }


  
}

const UpdateCourse = ({course, courseid}) => {

    const [title, setTitle] = useState(course.title);
    const [image, setImage] = useState(course.image);
    const [creator, setCreator] = useState(course.creator);
    const navigate = useNavigate();

    const handleEdit = () => {
        axios.put("http://localhost:3000/admin/course/" + courseid, {
            
            title: title,
            image: image,
            creator: creator
        }).then((res) => {
            course = res.data.course
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDelete = () => {
        axios.delete("http://localhost:3000/admin/course/" + courseid)
            .then((res) => {
                alert(res.data.message)
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='edit'>
            <div className="edit-input-fields">
                <input type="text" placeholder='Title' defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" placeholder='Image Link' defaultValue={image} onChange={(e) => setImage(e.target.value)} />
                <input type="text" placeholder='Creator' defaultValue={creator} onChange={(e) => setCreator(e.target.value)} />
                <button type='submit' onClick={handleEdit}>Edit</button>            
            </div>
            <div className='edit-course-card'>
                <img src={image} alt="" />
                <h3>{title}</h3>
                <p>by {creator}</p>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default Edit