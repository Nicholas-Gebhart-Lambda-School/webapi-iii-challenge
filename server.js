const express = require("express");
const server = express();
const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");
const cors = require("cors");
const logger = require("./middleware/logger");

// Global
server.use(logger("Logger"));
server.use(express.json());
server.use(cors());
// User routes
server.use("/api/posts", postsRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
