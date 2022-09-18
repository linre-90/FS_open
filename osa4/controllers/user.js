const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/User");

/**
 * Route Saves new user to db.
 */
usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    // All data validations are made in here.
    // Not in mongoose schema.
    // Validate length min 3 

    if(username == undefined || password == undefined || name == undefined){
        return response.status(400).send("Invalid request, missing fields.");
    }


    if(username.length < 4 || password.length < 4 ){
        return response.status(400).send("Username or password too short.");
    }

    // Validate username does not exists
    const queryByUsername = await User.find({username: username});
    if(queryByUsername.length > 0){
        return response.status(400).send("Username must be unique.");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

/**
 * Route to fetch all users from db.
 */
usersRouter.get("/", async (request, response) => {
    const users = await User.find({}, { username:1 ,name:1} ).populate("blogs", {url:1, title:1, author:1});
    response.json(users);
});

module.exports = usersRouter;