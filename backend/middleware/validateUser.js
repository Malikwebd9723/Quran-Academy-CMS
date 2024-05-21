const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateUser = async (req,res,next)=>{
    try {
        const token = req.header('auth-token')
        if(!token){
            res.status(401).json({error:"Not authenticated"})
        }
            const data = await jwt.verify(token,process.env.JWT_SEC);
            if(data.adminUser){
                req.user = data.adminUser
            }
            else if(data.teacher){
                req.user = data.teacher
            }
            else{
                req.user = data.user
            }
            next();
    } catch (err) {
        res.status(500).send({error:err.message})
    }
}

module.exports = validateUser;