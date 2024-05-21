const express = require("express");
const router = express.Router();
const registeration = require("../models/Registeration");
const Teacher = require("../models/Teacher");

//route for students registeration
router.post("/", async (req, res) => {
    try {
        let user = await registeration.findOne({ email: req.body.email });
        let user2 = await Teacher.findOne({ email: req.body.email });
        if (user || user2) {
            success = false;
            message = "Email already has been registered"
            res.status(409).json({success,message});
        }
        else {
            user = await registeration.create({
                fname: req.body.fname.toUpperCase(),
                lname: req.body.lname.toUpperCase(),
                gender:req.body.gender,
                email: req.body.email,
                //year of birth
                yob: req.body.yob,
                address: req.body.address,
                phone: req.body.phone,
                field: req.body.field,
                zoom: req.body.zoom,
                skype: req.body.skype,
            });
            success = true;
            message = `Thanks ${user.fname} ${user.lname} You applied successfully.After verification and registeration, account credientials will be E-mailed.`
            res.json({success,message})
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router;