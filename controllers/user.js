const { userModel } = require('../models/user');
const mongoose = require('mongoose');
const { setUser, getUser } = require('../service/auth');

async function handleUserSignin(req, res) {

    const { name, email, password, category } = req.body;


    const user = await userModel.create({
        name,
        email,
        password,
        category,
    });

    if(user.category=='student'){
        res.render('homeForStudent', {
            user:user
        });
    }
    else{
        res.render('homeForTeacher', {
            user:user
        });
    }

}

async function HandleUserLogin(req,res) {
    
    const { name, email, password } = req.body;

    const user=await userModel.findOne({email:email});

    if(!user){
        return res.render('login', {
            error:"Invalid username or password"
        });
    }
    const token=setUser(user);
    res.cookie("uid", token);

    if(user.category=='student'){
        return res.render('homeForStudent', {
            user:user
        });
    }
    else{
        return res.render('homeForTeacher', {
            user:user
        });
    }
}

module.exports = {
    handleUserSignin,
    HandleUserLogin,
}
