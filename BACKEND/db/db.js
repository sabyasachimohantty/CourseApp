const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
    },
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
})

const courseSchema = new mongoose.Schema({
    title: String,
    image: String,
    creator: String
})

const User = mongoose.model('user', userSchema)
const Course = mongoose.model('course', courseSchema)

module.exports = {
    User,
    Course
}