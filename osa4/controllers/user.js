const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/User");

/**
 * Route Saves new user to db.
 */
usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

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
    const users = await User.find({});
    const parsedUsers = users.map(user => {
        return {
            username: user.name,
            name: user.name,
            id: user.id
        };
    });
    response.json(parsedUsers);
});

module.exports = usersRouter;