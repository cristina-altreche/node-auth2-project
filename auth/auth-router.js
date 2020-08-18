const bcrypt = require("bcrypt")
const router = require("express").Router()
const Users = require("../users/users-model")

router.post("/register", (req, res) => {
    let credentials = req.body
    const rounds = 4;
    const hash = bcrypt.hashSync(credentials.password, rounds)

    credentials.password = hash

    Users.add(credentials)
    .then((saved) => {
        res.status(201).json({ data: saved})
    })
})