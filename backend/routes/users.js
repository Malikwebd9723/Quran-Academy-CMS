const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const registeration = require("../models/Registeration");
const teacher = require("../models/Teacher");
const validateUser = require("../middleware/validateUser")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require("dotenv").config()
var nodemailer = require('nodemailer');
const Host = 'http://localhost:3000'


//route  for user profile

router.get("/profile", validateUser, async (req, res) => {
    try {
        let admin = await Admin.findById(req.user.id).select("-password")
        let user = await registeration.findById(req.user.id).select("-password");
        let teacherprofile = await teacher.findById(req.user.id).select("-password");

        if (admin) {
            res.json(admin);
        }
        else if (user && user.status == "registered") {
            res.json(user);
        }
        else if (teacherprofile && teacherprofile.status == "registered") {
            res.json(teacherprofile);
        }
        else {
            res.status(404).send("user not found or un-registered");
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
//route for admin to get all students applicant

router.get("/studentapplicant", validateUser, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id);
        if (admin.isAdmin) {
            const applicants = await registeration.find({ status: "applicant" }).select("-password");
            res.json(applicants)
        }
        else {
            res.status(401).send("not allowed!")
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//route for admin to get all teachers applicant

router.get("/teacherapplicant", validateUser, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id);
        if (admin.isAdmin) {
            const applicants = await teacher.find({ status: "applicant" }).select("-password");
            res.json(applicants)
        }
        else {
            res.status(401).send("not allowed!")
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


//route for admin to fetch all registered students
router.get("/allstudents", validateUser, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id);

        if (admin.isAdmin) {
            const allstudents = await registeration.find({ status: "registered" }).select("-password");
            res.json(allstudents)
        }
        else {
            res.status(401).send("not allowed!");
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
});


//route for admin to fetch all registered teachers
router.get("/allteachers", validateUser, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id);

        if (admin.isAdmin) {
            const allstudents = await teacher.find({ status: "registered" }).select("-password");
            res.json(allstudents)
        }
        else {
            res.status(401).send("not allowed!");
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
});


//route for user to update himself
router.put("/update/:id", validateUser, async (req, res) => {
    try {
        const { fname, lname, gender, email, phone, address, zoom, skype } = req.body;

        const updated = {};
        if (fname) updated.fname = fname.toUpperCase();
        if (lname) updated.lname = lname.toUpperCase();
        if (gender) updated.gender = gender;
        if (email) updated.email = email;
        if (phone) updated.phone = phone;
        if (address) updated.address = address;
        if (zoom) updated.zoom = zoom;
        if (skype) updated.skype = skype;

        let admin = await Admin.findById(req.params.id)
        let user = await registeration.findById(req.params.id);
        let user2 = await teacher.findById(req.params.id);

        if (admin && req.user.id.toString() == req.params.id) {
            admin = await Admin.findByIdAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true })
            res.json(admin);
        }
        else if (user && user.status == "registered" && req.user.id.toString() == req.params.id) {
            user = await registeration.findByIdAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true })
            res.json(user);
        }
        else if (user2 && user2.status == "registered" && req.user.id.toString() == req.params.id) {
            user2 = await teacher.findByIdAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true })
            res.json(user2);
        }
        else {
            res.status(401).send("no user or you are not allowed!")
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});


// //route for admin to update student
// router.put("/updatestudent/:id", validateUser, async (req, res) => {
//     try {
//         const { fname, lname, email, phone, gender, address, yob, field, zoom, skype } = req.body;

//         const updated = {};
//         if (fname) updated.fname = fname;
//         if (lname) updated.lname = lname;
//         if (gender) updated.gender = gender;
//         if (email) updated.email = email;
//         if (phone) updated.phone = phone;
//         if (address) updated.address = address;
//         if (field) updated.field = field;
//         if (yob) updated.yob = yob;
//         if (zoom) updated.zoom = zoom;
//         if (skype) updated.skype = skype;

//         let user = await registeration.findById(req.params.id);

//         const admin = await Admin.findById(req.user.id);

//         if (user && user.status == "registered" && admin.isAdmin) {
//             user = await registeration.findByIdAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true })
//             res.json(user);
//         }
//         else {
//             res.status(401).send("no user or you are not allowed!")
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message })
//     }
// });


//route for admin to update user
router.put("/updateuser/:id", validateUser, async (req, res) => {
    try {
        const { fname, lname, gender, email, phone, address, field, certification, yob, yoc, lta, experiance, zoom, skype } = req.body;

        const updated = {};
        if (fname) updated.fname = fname.toUpperCase();
        if (lname) updated.lname = lname.toUpperCase();
        if (email) updated.email = email;
        if (gender) updated.gender = gender;
        if (phone) updated.phone = phone;
        if (address) updated.address = address;
        if (field) updated.field = field;
        if (certification) updated.certification = certification;
        if (yoc) updated.yoc = yoc;
        if (yob) updated.yob = yob;
        if (lta) updated.lta = lta;
        if (experiance) updated.experiance = experiance;
        if (zoom) updated.zoom = zoom;
        if (skype) updated.skype = skype;

        let admin = await Admin.findById(req.user.id);
        let user = await registeration.findById(req.params.id);
        let user2 = await teacher.findById(req.params.id);

        if (user && admin && admin.isAdmin) {
            user = await registeration.findByIdAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true });
            res.json(user);
        }
        else if (user2 && admin && admin.isAdmin) {
            user2 = await teacher.findByIdAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true });
            res.json(user2);
        }
        else {
            res.status(401).json("no user or you are not allowed!")
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// get specific user for attendance
router.get("/studentattendance", validateUser, async (req, res) => {
    try {
        const Teacher = await teacher.findById(req.user.id);
        const users = await registeration.find({ teacher: req.user.id });

        if (Teacher && users) {
            res.json(users)
        }
        else {
            res.status(404).json("not found")
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//route for admin to delete user
router.delete("/delete/:id", validateUser, async (req, res) => {
    try {
        let admin = await Admin.findById(req.user.id);
        let user = await registeration.findById(req.params.id)
        let user2 = await teacher.findById(req.params.id)

        if (user && admin.isAdmin) {
            user = await registeration.findByIdAndDelete({ _id: req.params.id });
            res.json("user has been deleted!");
        }
        else if (user2 && admin.isAdmin) {
            user2 = await teacher.findByIdAndDelete({ _id: req.params.id });
            res.json("user has been deleted!");
        }
        else {
            res.status(401).json("no user or you are not allowed!")
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});


// change password route

router.put('/updatepassword', validateUser, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id)
        const user = await teacher.findById(req.user.id);
        const user2 = await registeration.findById(req.user.id);
        const { password, newpassword } = req.body;

        if (admin) {
            const comparePassword = await bcrypt.compare(password, admin.password);
            if (comparePassword) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(newpassword, salt);
                await admin.updateOne({ $set: { password: hashPassword } })
                res.json("password updated")
            }
            else {
                res.json("enter the correct password")
            }
        }
        else if (user && user.status === 'registered') {

            const comparePassword = await bcrypt.compare(password, user.password);
            if (comparePassword) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(newpassword, salt);
                await user.updateOne({ $set: { password: hashPassword } })
                res.json("password updated")
            }
            else {
                res.json("enter the correct password")
            }
        }

        else if (user2 && user2.status === 'registered') {
            const comparePassword = await bcrypt.compare(password, user2.password);
            if (comparePassword) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(newpassword, salt);
                await user2.updateOne({ $set: { password: hashPassword } })
                res.json("password updated")
            }
            else {
                res.json("enter the correct password")
            }
        }
        else {
            res.status(404).json("user not found")
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// add new email address
router.put("/updateemail", validateUser, async (req, res) => {
    try {
        const { email } = req.body;
        const existadmin = await Admin.findOne({ email: email })
        const existstudent = await registeration.findOne({ email: email })
        const existteacher = await teacher.findOne({ email: email })

        if (existadmin || existstudent || existteacher) {
            res.json("try another email")
        }
        else {
            const admin = await Admin.findById(req.body.id)
            const user = await registeration.findById(req.user.id);
            const user2 = await teacher.findById(req.user.id);
            if (admin) {
                await Admin.updateOne({ $set: { email: email } })
                res.json('email updated')
            }
            else if (user) {
                await user.updateOne({ $set: { email: email } })
                res.json('email updated')
            }
            else if (user2) {
                await user2.updateOne({ $set: { email: email } })
                res.json('email updated')
            }
            else {
                res.status(404).json("user not found")
            }
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// forgot password
router.post('/forgotpassword', async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email: email })
        const user = await teacher.findOne({ email: email });
        const user2 = await registeration.findOne({ email: email });
        if (admin) {
            const authToken = await jwt.sign({ admin: { id: admin._id } }, process.env.JWT_SEC)
            //send password mail to user

            var transporter = await nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.email,
                    pass: process.env.pass
                }
            });

            var mailOptions = {
                from: process.env.email,
                to: email,
                subject: 'Password Reset!',
                text: `Click to reset password:
                                    ${Host}/resetpassword/${admin._id}/${authToken}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json(error);
                } else {
                    res.json('Email sent: ' + info.response);
                }
            });

            res.json("Check your email")
        }

        else if (user) {
            const authToken = await jwt.sign({ user: { id: user._id } }, process.env.JWT_SEC)
            //send password mail to user

            var transporter = await nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.email,
                    pass: process.env.pass
                }
            });

            var mailOptions = {
                from: process.env.email,
                to: email,
                subject: 'Password Reset!',
                text: `Click to reset password:
                                    ${Host}/resetpassword/${user._id}/${authToken}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json(error);
                } else {
                    res.json('Email sent: ' + info.response);
                }
            });

            res.json("Check your email")
        }
        else if (user2) {
            const authToken = await jwt.sign({ user2: { id: user2._id } }, process.env.JWT_SEC)
            //send password mail to user

            var transporter = await nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.email,
                    pass: process.env.pass
                }
            });

            var mailOptions = {
                from: process.env.email,
                to: email,
                subject: 'Password Reset!',
                text: `Click to reset password:
                                    ${Host}/resetpassword/${user2._id}/${authToken}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json(error);
                } else {
                    res.json('Email sent: ' + info.response);
                }
            });
            res.json("Check your email")
        }
        else {
            res.status(404).json("user not found!")
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// resetpassword after varifying token

router.put("/resetpassword/:id/:token", async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        const user = await teacher.findById(req.params.id);
        const user2 = await registeration.findById(req.params.id);

        if (admin) {
            const authToken = await jwt.verify(req.params.token, process.env.JWT_SEC)
            if (authToken) {
                const hash = await bcrypt.hash(req.body.password, 10)
                await Admin.updateOne({ $set: { password: hash } })
                const success = true;
                const message = "Password updated!"
                res.json({ success, message })
            }
            else {
                const success = false;
                const message = "token invalid"
                res.json({ success, message })
            }
        }

        else if (user) {
            const authToken = await jwt.verify(req.params.token, process.env.JWT_SEC)
            if (authToken) {
                const hash = await bcrypt.hash(req.body.password, 10)
                await user.updateOne({ $set: { password: hash } })
                const success = true;
                const message = "Password updated!"
                res.json({ success, message })
            }
            else {
                const success = false;
                const message = "token invalid"
                res.json({ success, message })
            }
        }

        else if (user2) {
            const authToken = await jwt.verify(req.params.token, process.env.JWT_SEC)
            if (authToken) {
                const hash = await bcrypt.hash(req.body.password, 10)
                await user2.updateOne({ $set: { password: hash } })
                const success = true;
                const message = "Password updated!"
                res.json({ success, message })
            }
            else {
                const success = false;
                const message = "token invalid"
                res.json({ success, message })
            }
        }
        else {
            const success = false;
            const message = "not a valid user"
            res.json({ success, message })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


module.exports = router;