const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt = require('jsonwebtoken')
require("dotenv").config()
const Admin = require("../models/Admin");
const registeration = require("../models/Registeration");
const Teacher = require("../models/Teacher");

// route for student login
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        let adminUser = await Admin.findOne({email:req.body.email})
        let user = await registeration.findOne({ email });
        let teacher = await Teacher.findOne({ email });

        if (adminUser) {
            const comparePassword = await bcrypt.compare(password, adminUser.password);
            if (!comparePassword) {
                success = false;
                admin = false;
                message = " OOps! Password incorrect!"
                res.json({success,admin,message});
            }
            else {
                authToken =jwt.sign({ adminUser: { id: adminUser.id } }, process.env.JWT_SEC)
                success = true;
                admin = true;
                res.json({success,admin,authToken})
            }
        }
        else if (user && user.status == "registered") {
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                success = false;
                admin = false;
                message = " OOps! Password incorrect!"
                res.json({success,admin,message});
            }
            else {
                authToken =jwt.sign({ user: { id: user.id } }, process.env.JWT_SEC)
                success = true;
                admin = false;
                res.json({success,admin,authToken})
            }
        }

        else if(teacher && teacher.status == "registered"){
            const comparePassword = await bcrypt.compare(password, teacher.password);
            if (!comparePassword) {
                success = false;
                admin = false;
                message = "OOps! Password incorrect!"
                res.json({success,admin,message});
            }
            else {
                const authToken = jwt.sign({ teacher: { id: teacher.id } }, process.env.JWT_SEC)
                admin = false
                success = true;
                res.json({success,admin,authToken})
            }
        }


        else {
            success = false;
            admin = false;
            message= "OOps! User not found"
            res.status(404).json({success,admin,message})
        }

    } catch (err) {
        res.json({ error: err.message })
    }
});

module.exports = router;