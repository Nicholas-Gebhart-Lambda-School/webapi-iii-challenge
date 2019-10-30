const express = require("express");

const server = express();
server.use(logger("Logger"));

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(prefix) {
  return (req, res, next) => {
    const { url, method } = req;
    const time = new Date().toISOString();
    console.log(`${prefix}: [${time}] ${method} to ${url}`);
    next();
  };
}

module.exports = server;
