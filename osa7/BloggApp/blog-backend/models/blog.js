/**
 * Blog mongoose schema.
 */
const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    author: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: {
        type: Array,
    },
});

// Convert mongo objectId() to string in returned entities.
// Delete _id and _v.
schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Blog", schema);
