const bcrypt = require("bcrypt");
const router = require("express").Router();
const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let credentials = req.body;
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
});

Users.findBy({ username })
  .then((users) => {
    const user = users[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.loggedIn = true;
      req.session.username = user.username;

      res.status(200).json({ message: "welcome!", session: req.session });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  })
  .catch((error) => {
    res.status(500).json({ error: error.message });
  });

module.exports = router;
