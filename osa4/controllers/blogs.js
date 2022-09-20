/**
 * Module contains blogs backend routing.
 */

const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const utils = require("../utils/config");

/**
 * Returns all blogs.
 */
blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username:1, name:1});    
    response.json(blogs);
});


/**
 * Route to post new blog post
 */
blogRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);
    const decodedToken = jwt.verify(request.headers.token, utils.SECRET);
    
    if(!decodedToken.id){
        return response.status(401).json({error: "Token missing or invalid"});
    }
    const user = await User.findById(decodedToken.id);
    blog.user = user._id;

    try {
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.status(201).json(savedBlog);
    } catch (error) {
        console.log(error);
        response.status(400).send();
    }
    
});


/**
 * Route to delete blog post.
 */
blogRouter.delete("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const decodedToken = jwt.verify(request.headers.token, utils.SECRET); 
    const user = await User.findById(decodedToken.id);

    if(user.id.toString() === blog.user.toString()){
        blog.remove();
        response.status(204).send();
    }else{
        response.status(404).json({error: "Invalid user. Deletion canceled."});
    }
});



/**
 * Route to update blog post.
 */
blogRouter.put("/:id", (request, response) => {
    Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            response.json(result);
        })
        .catch(error => {response.status(404).send()});
});

module.exports = blogRouter;
