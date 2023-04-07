const express = require('express')
const { register, login, logout } = require('../Controllers/userController')
const router = express.Router()
const passport = require('passport')
const isLoggedIn = require('../Middleware/auth')    

router.post('/register', register)
router.get('/login', (req, res) => {
    res.render('login')
})



router.post('/login', passport.authenticate('local', { successRedirect: '/post/getAll', failureRedirect: '/users/login' }), login)
router.get('/logout',isLoggedIn,logout)

module.exports = router