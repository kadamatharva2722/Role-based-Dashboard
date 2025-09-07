const express=require('express');
const {userModel}=require('../models/user');
const router=express.Router();

router.get('/signin', (req,res)=>{
    res.render('signin');
});

router.get('/login', async(req,res)=>{
    const user=await userModel.find({});
    res.render('login');
});

router.get('/welcome', (req,res)=>{
    return res.render('welcome');
})

module.exports=router
