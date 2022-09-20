//const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs.js");
const userRouter = require("./controllers/user.js");
const loginRouter = require("./controllers/login");
const tokenExtractor = require("./middlewares/tokenExtractor");
const userExtractor = require("./middlewares/userExtractor");


const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);
app.use(cors());
app.use(express.json());

app.use(tokenExtractor);
app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);


const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
