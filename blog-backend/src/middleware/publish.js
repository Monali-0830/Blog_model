const express = require('express');
const mongoose = require('mongoose');
const BlogModel = require('../models/blog');

const PublishMiddleware = async (req, res) => {
    try {
    const { id, title, content, tags = [] } = req.body;

    if (!title || !content) {
        return res.status(400).send("Title and Content are required fields");
    }

    const payload = {
        title,
        content,
        tags,
        status: "publish",      
        publishedAt: Date.now()
    };

    if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Id is not valid");
        }

        const blog = await BlogModel.findById(id);
        if (!blog) {
        return res.status(404).send("Blog not found");
        }

        Object.assign(blog, payload);
        await blog.save();
        return res.status(200).send("Blog Updated Successfully");
    } else {
        const newBlog = await BlogModel.create(payload);
        return res
        .status(201)
        .json({ message: "New Blog Created", blog: newBlog });
    }

    } catch (err) {
    console.error(err);
    return res.status(500).send("Error publishing the Blog");
    }
};


module.exports = PublishMiddleware;