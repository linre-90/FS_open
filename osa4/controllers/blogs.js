/**
 * Module contains blogs backend routing.
 */

const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/User");


blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username:1, name:1});    
    response.json(blogs);
});


blogRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);

    // Temp user assigning ------>
    const users = await User.findOne({});
    blog.user = users._id;
    // <-------- Temp user assigning

    try {
        const savedBlog = await blog.save();
        users.blogs = users.blogs.concat(savedBlog._id);
        await users.save();
        response.status(201).json(savedBlog);
    } catch (error) {
        response.status(400).send();
    }
    
});


blogRouter.delete("/:id", (request, response) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).send())
        .catch(error => response.status(404).send());    
});


blogRouter.put("/:id", (request, response) => {

    Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            response.json(result);
        })
        .catch(error => {response.status(404).send()});
});

module.exports = blogRouter;
