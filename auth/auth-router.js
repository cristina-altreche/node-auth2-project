const bcrypt = require("bcrypt");
const router = require("express").Router();
const Users = require("../users/users-model");
const constants = require("../config/constants");
const jwt = require("jsonwebtoken")
const { isValid } = require("../users/users-service.js");

router.post("/register", (req, res) => {
  let credentials = req.body;
  if (isValid(credentials)) {
    const rounds = 4;
    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((saved) => {
        res.status(201).json({ data: saved });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password should be alphanumeric ",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = signToken(user);
          res.status(200).json({ message: "Welcome to our API", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  //   const secret = process.env.JWT_SECRET || "is it secret, is it safe?";
  const secret = constants.jwtSecret;

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
