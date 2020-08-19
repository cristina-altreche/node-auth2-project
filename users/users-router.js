const express = require("express");
const router = express.Router();

const Users = require("./users-model");
const authorization = require("../auth/auth-middleware");

router.get("/", authorization, (req, res) => {

  Users.find()
    .then((users) => {
      res.status(200).json({ data: users, jwt: req.decodedToken });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
