import React, { useEffect, useState } from 'react'
import '../styles/Homepage.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Homepage = () => {

  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/admin/courses')
        .then((res) => {
            console.log(res)
            setCourses(res.data.courses)
            console.log(courses)
        })
        .catch((err) => console.log(err))
  }, [])
    
  return (
    <div className="cards">
        {courses.map((course) => {
            return <Courses course={course} />
        })}
    </div>
    
  )
}

const Courses = ({course}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${course._id}`)
    }

    return(
        <div className='course-card' onClick={handleClick}>
            <img src={course.image} alt="" />
            <h3>{course.title}</h3>
            <p>by {course.creator}</p>
            <button>Buy Now</button>
        </div>
    )
}

export default Homepage