const Blog = require('../models/blog');

const getAllMiddle = async (req , res)=>{
    try{
    const blogs = await Blog.find();
    if(!blogs){
        throw new Error("No Blog is present in Db");
    }
    res.send(blogs);
}catch(err){
    res.status(500).send(err.message);
}
}

module.exports = getAllMiddle;