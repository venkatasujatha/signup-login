const student =require('../controller/studentController')
const router =require('express').Router()
const bcrypt =require('bcryptjs')
router.post('/signup',student.signUp);
router.post('/login',student.login)

module.exports = router