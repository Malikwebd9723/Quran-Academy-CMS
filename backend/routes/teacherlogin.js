const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt = require('jsonwebtoken')
require("dotenv").config()
const teacher = require("../models/Teacher");

// route for teacher login
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await teacher.findOne({ email });
        if (user && user.status == "registered") {
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                res.json("password incorrect!");
            }
            else {
                const authToken = jwt.sign({ user: { id: user.id } }, process.env.JWT_SEC)
                user.isAdmin?admin = true:admin = false
                res.json({admin,authToken})
            }
        }
        else {
            res.status(404).json("user not registered!")
        }
    } catch (err) {
        res.json({ error: err.message })
    }
});


module.exports = router;


// "email":"malik9723usman@gmail.com",
// "password":"h6h6d5aee0"