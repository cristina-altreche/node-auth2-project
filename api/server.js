const express = require("express");
const server = express();
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const authenticate = require("../auth/auth-middleware");
const dbConnection = require("../data/connection");

const sessionConfig = {
  name: "monster", // default value is sid
  secret: "secret stuff",
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 30,
  }),
};

// server.use(session(sessionConfig));
server.use(express.json());
server.use("/api/users", authenticate, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ message: "Server is up from server.js!" });
});

module.exports = server;
