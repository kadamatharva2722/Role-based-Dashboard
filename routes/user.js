const express=require('express');
const router=express.Router();
const {handleUserSignin, HandleUserLogin}=require('../controllers/user');

router.post('/signin', handleUserSignin);

router.post('/login', HandleUserLogin)

module.exports=router;
