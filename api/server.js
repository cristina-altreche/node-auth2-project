const express = require("express");
const server = express();
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router")
const authenticate = require("../auth/auth-middleware")

server.use(express.json());

server.use("/api/users", authenticate, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ message: "Server is up from server.js!" });
});

module.exports = server;
