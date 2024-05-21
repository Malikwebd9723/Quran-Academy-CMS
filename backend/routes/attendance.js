const express = require("express");
const router  = express.Router()
const registeration = require("../models/Registeration");
const teacher = require("../models/Teacher")
const validateUser = require("../middleware/validateUser")



//user attendence percenttage
    router.get("/:id",async (req,res)=>{
        try {
                const user = await registeration.findById(req.params.id);
                if(user && user.status == "registered"){
                    res.json(user.attendence)
                }
                else{
                    res.status(401).send("something went wrong!")
                }
        } catch (err) {
            res.status(500).json({error: err.message})
        }
        });


//increase user attendance
router.post("/inc/:id",validateUser,async (req,res)=>{
try {
    const authentication =await teacher.findById(req.user.id);
    if(authentication){
        const fullDate = await new Date();
        const today = await fullDate.getDate();
        const month = await fullDate.getMonth();
        const year = await fullDate.getFullYear();
        const  date = `${today},${month+1},${year}`;

        const user = await registeration.findById(req.params.id);
        if(user && user.status == "registered"){
            await user.updateOne({$push:{attendence:{status:"Present",date:date}} })
            await user.updateOne({$set:{lastattendence:date}})
            res.json("Attendence Status: Present")
        }
        else{
            res.status(404).json("user not found")
        }
    }
    else{
        res.status(401).json({error:"You are not authentic user to do this!"})
    }
} catch (err) {
    res.status(500).json({error: err.message})
}
});

//decrease user attendence
router.post("/dec/:id",validateUser,async (req,res)=>{
    try {
        const authentication = await teacher.findById(req.user.id);
        if(authentication){
        const fullDate = await new Date();
        const today = await fullDate.getDate();
        const month = await fullDate.getMonth();
        const year = await fullDate.getFullYear();
        const  date = `${today},${month+1},${year}`;
        
            const user = await registeration.findById(req.params.id);
            if(user && user.status == "registered"){
                await user.updateOne({$push:{attendence:{status:"Absent",date:date}}})
                await user.updateOne({$set:{lastattendence:date}})
                res.json("Attendence Status: Absent")
            }
            else{
                res.status(404).json("user not found")
            }
        }
        else{
            res.status(401).json({error:"You are not authentic user to do this!"})
        }
    } catch (err) {
        res.status(500).json({error: err.message})
    }
    });

    module.exports = router;
