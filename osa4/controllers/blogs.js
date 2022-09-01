/**
 * Module contains blogs backend routing.
 */

const blogRouter = require('express').Router();
const Blog = require('../models/blog.js');


blogRouter.get("/", (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs);
        });
});


blogRouter.post("/", (request, response) => {
    const blog = new Blog(request.body)
    blog.save()
        .then(result => {
            response.status(201).json(result);
        }).catch(error => {
            response.status(400).send();
        });
});


blogRouter.delete("/:id", (request, response) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).send())
        .catch(error => response.status(404).send());    
});


blogRouter.put("/:id", (request, response) => {

    console.log(request.body);

    Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            response.json(result);
        })
        .catch(error => {response.status(404).send()});
});

module.exports = blogRouter;
