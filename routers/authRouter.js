
const express = require('express');
const { signup, signin, getUser, logout  } = require('../controllers/authController');
const jwtAuth = require('../middleware/jwtAuth');

const authRouter = express.Router();

//routers
authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.get('/user',jwtAuth, getUser)
authRouter.get('/logout',jwtAuth, logout)




//Export authRouter
module.exports = authRouter