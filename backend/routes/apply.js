const express = require("express");
const router = express.Router();
require("dotenv").config()
const teacher = require("../models/Teacher");
const registeration = require("../models/Registeration");


//route for teacher application
router.post("/", async (req, res) => {
    try {
        let user = await teacher.findOne({ email: req.body.email });
        let user2 = await registeration.findOne({ email: req.body.email });

        if (user ||user2) {
            success= false;
            message = "Email already has been registered"
            res.status(409).json({success,message});
        }
        else {
            user = await teacher.create({
                fname: req.body.fname.toUpperCase(),
                lname: req.body.lname.toUpperCase(),
                gender:req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                certification: req.body.certification,
                //year of complition
                yoc: req.body.yoc,
                //last teaching address
                lta: req.body.lta,
                experiance: req.body.experiance,
                field: req.body.field,
                zoom: req.body.zoom,
                skype: req.body.skype,
            });
            success = true;
            let message = `Thanks ${user.fname} ${user.lname} you applied successfully.After verification and registeration, account credientials will be E-mailed.`
            res.json({success,message})
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router;