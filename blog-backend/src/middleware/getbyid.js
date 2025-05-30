const Blog = require('../models/blog');

const getById = async (req , res)=>{
    try{
    const userId = req.params.id;

    const blog = await Blog.findOne({"_id" :userId});
    if(!blog){
        throw new Error("No Blog with this id");
    }
    res.send(blog);
}catch(err){
    res.status(500).send("Error : " + err.message);
}};

module.exports = getById;
