const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router();
require("dotenv").config()
const Admin = require("../models/Admin");
const teacher = require("../models/Teacher");
var nodemailer = require('nodemailer');
const validateUser = require("../middleware/validateUser")




//route to make teacher registered
router.post("/:id",validateUser, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id);
        //find user if he appy for registeration or not
        let findone = await teacher.findById(req.params.id);
        if (!admin.isAdmin || findone.status === "registered") {
            res.status(409).json("Not authentic! or user already registered");
        }
        else {
            const salt = await bcrypt.genSalt(10);
            /* Function to generate combination of password */
           function generateP() {
                var pass = '';
                var str = findone.fname + findone.lname;

                for (let i = 1; i <= 5; i++) {
                    var char = Math.floor(Math.random()
                        * str.length + 1);

                    pass += str.charAt(char)+ findone.id.charAt(char)
                }

                return pass;
            }
            const pass = await generateP();

            const hashPassword = await bcrypt.hash(pass, salt);
            user = await teacher.updateOne({_id:req.params.id},{$set: { status: "registered", password:hashPassword}});
            res.json("user successfully registered! And mail has been sent");

            //send password mail to user

            var transporter = await nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS:true,
                auth: {
                    user: process.env.email,
                    pass: process.env.pass
                }
            });

            var mailOptions = {
                from: process.env.email,
                to: findone.email,
                subject: 'User credientails for authentication',
                text: `Thanks ${findone.fname} ${findone.lname}.
                Your are now registered with us!
                You can now login using 
                E-mail:${findone.email}
                Password: ${pass}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res,json(error);
                } else {
                    res.json('Email sent: ' + info.response);
                }
            });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router;