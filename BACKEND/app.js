const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { User, Course } = require('./db/db.js')

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
            console.log(user)
            req.user = user;
            next();
        });
        return
    } else {
        res.sendStatus(401);
        return;
    }

}



mongoose.connect(process.env.DB_URI)
    .then((result) => {
        app.listen(8000, () => {
            console.log("App listening on port 8000")
        })
    })
    .catch((err) => console.log(err))


app.get('/admin/me', authenticateJwt, (req, res) => {
    const user = req.user
    res.json(user)
})


app.post('/admin/signup', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    
    if ( await User.findOne(user) ) {
        res.status(409).json({ message: "User already exists" })
    } else {
        user.save()
            .then((result) => {
                res.status(200).json({ status : "success" })
            })
            .catch((err) => {
                console.log(err)
            })
    }

})


app.post('/admin/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({ email, password }, process.env.SECRET, {expiresIn: '1h'})
        res.json({ message: "logged in successfully", token })
    } else {
        res.status(401).json({ message: "User not found" })
    }
})


app.post('/admin/create', authenticateJwt, (req, res) => {
    const course = new Course({
        title: req.body.title,
        image: req.body.image,
        creator: req.body.creator
    })

    course.save()
        .then((result) => {
            res.sendStatus(200).json({ status: "course created successfully!" })
        })
        .catch((err) => {
            console.log(err)
        })
})


app.get('/admin/courses', async (req, res) => {
    const courses = await Course.find({})
    res.status(200).json({ courses })
})


app.get('/admin/course/:courseid', authenticateJwt, async (req, res) => {
    const courseid = req.params.courseid;
    try {
        const course = await Course.findById(courseid)
        if (course) {
            res.status(200).json({
                id: courseid,
                title: course.title,
                image: course.image,
                creator: course.creator
            })
            return
        } else {
            res.status(404).json({ message: "course not found" })
            return
        }
        
    } catch (error) {
        console.log(error)
    }
    
})


app.put('/admin/course/:courseid', async (req, res) => {
    const courseid = req.params.courseid
    const course = await Course.findByIdAndUpdate(courseid, req.body, { new: true })
    if (course) {
        res.status(201).json({ message: "course updated successfully", course })
    } else {
        res.status(404).json({ message: "course not found" })
    }
})


app.delete('/admin/course/:courseid', async (req, res) => {
    await Course.deleteOne({ _id: req.params.courseid})
        .then((result) => {
            res.json({ message: "Course deleted successfully!" })
        })
        .catch((err) => {
            console.log(err)
        })
    
})
