/**
 * Blog mongoose model
 */


const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: { type: String, required: [true] },
    author: String,
    url: { type: String, required:[true] },
    likes: { type: Number, default: 0 }
});

// override _id to id
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});
  
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;