const express = require('express');
const router = express.Router();
const savedraftmiddleware = require('../middleware/savedraft');
const PublishMiddleware = require('../middleware/publish');
const  getAllMiddle = require('../middleware/getAll');
const  getById  = require('../middleware/getbyid');
const Signup = require('../middleware/Signup');
const Login = require('../middleware/Login');
const UserAUth = require('../utils/auth');
const getPublished = require('../middleware/getpublished');


router.post('/save-draft',UserAUth,savedraftmiddleware);
router.post('/publish',UserAUth,PublishMiddleware);
router.get('/published', UserAUth, getPublished);
router.get('/',UserAUth,getAllMiddle);
router.get('/:id',UserAUth,getById);
router.post('/signup',Signup);
router.post('/login',Login);

module.exports = router;