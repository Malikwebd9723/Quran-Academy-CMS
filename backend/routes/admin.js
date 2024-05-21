const express = require("express");
const router = express.Router();
require("dotenv").config()
const admin = require("../models/Admin");
const teacher = require("../models/Teacher");
const registeration = require("../models/Registeration");
const bcrypt = require("bcryptjs")

//route for teacher application
router.post("/", async (req, res) => {
    try {
        let adminUser = await admin.findOne({email:req.body.email})
        let user = await teacher.findOne({ email: req.body.email });
        let user2 = await registeration.findOne({ email: req.body.email });

        if ( adminUser || user ||user2) {
            success= false;
            message = "Email already has been registered"
            res.status(409).json({success,message});
        }
        else {
            const {fname,lname,email,password} = req.body 
            const hashPassword = await bcrypt.hash(password, 10)
            await admin.create({
                fname: fname.toUpperCase(),
                lname: lname.toUpperCase(),
                email: email,
                password: hashPassword,
            });
            const success = true;
            const message = "admin registered"
            res.json({success, message})
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router;