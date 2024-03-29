const mongoose = require("mongoose");

/**
 * Blog mongoose model
 */
const blogSchema = mongoose.Schema({
    title: { type: String, required: [true] },
    author: String,
    url: { type: String, required:[true] },
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

// override _id to id and remove _v.
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
  
// For exporting
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;