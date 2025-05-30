const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
require('dotenv').config();

const Login = async (req,res) =>{
    try{
    const {emailId , password } =req.body;

    const user = await UserModel.findOne({"emailId" : emailId});
    if(!user){
        throw new Error("Invalid Credentials");
    }

    const isValidPassword = bcrypt.compare(password,user.password);
    if (isValidPassword) {
  const token = jwt.sign({ "_id": user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  res.cookie("Token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true, // recommended for security
  });

  // Send token in response body
  res.json({ token });
}


    }catch(err){
        res.status(500).send("Error : " + err.message);
    }
}

module.exports = Login;