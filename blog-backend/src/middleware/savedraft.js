const  express = require('express');
const mongoose = require('mongoose');
const BlogModel = require('../models/blog');


const savedraftmiddleware  = async (req, res) => {
try {
    const { id, title, content, tags = [], status } = req.body;

    if (!title || !content) {
        return res.status(400).send("Title and content are required fields");
    }

    if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid Blog Id");
        }

        const blog = await BlogModel.findById(id);
        if (!blog) {
        return res.status(404).send("Draft not found");
        }

        blog.title   = title;
        blog.content = content;
        blog.tags    = tags;
        blog.status  = 'draft';

        await blog.save();

        return res.status(200).json({
            message: "Draft updated successfully",
            blog,
        });
    }

    const newBlog = await BlogModel.create({
        title,
        content,
        tags,
        status: 'draft'
    });

    return res.status(201).json({
        message: "Draft created successfully",
        blog: newBlog
    });

    } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
    }
};

module.exports = savedraftmiddleware;
