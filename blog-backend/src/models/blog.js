const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type:String,
        required : true
    },
    content :{
        type:String,
        required:true
    },
    tag :{
        type:[String],
        default:[]
    },
    status :{
        type:String,
        enum:["draft","publish"],
        default:"draft"
    }
},{
    timestamps : true
})

const BlogModel = mongoose.model("BlogModel",blogSchema);
module.exports = BlogModel;