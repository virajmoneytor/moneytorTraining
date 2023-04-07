const express = require('express')
const router = express.Router()
const {createPost, getPostById, getAllPosts, updatePost, deletePost, likePost} = require('../Controllers/postController')
const isLoggedIn = require('../Middleware/auth')    

router.post('/create',isLoggedIn,createPost)
router.get('/getById',isLoggedIn,getPostById) 
router.get('/getAll',isLoggedIn,getAllPosts)
router.post('/update',isLoggedIn,updatePost)
router.post('/delete',isLoggedIn,deletePost)
router.post('/like',isLoggedIn,likePost)

module.exports = router
