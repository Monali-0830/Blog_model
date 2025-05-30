const mongoose = require('mongoose');
const { isLowercase, trim } = require('validator');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        minLength : 4
    },
    emailId:{
        type:String,
        unique:true,
        isLowercase:true,
        trim:true
    },
    password:{
        type:String,
    }
},{
    timeStamps : true
})

const UserModel = mongoose.model("UserModel" , UserSchema);
module.exports = UserModel;