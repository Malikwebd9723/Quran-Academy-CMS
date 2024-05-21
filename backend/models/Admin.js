const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    type:{
        type:String,
        default:"teacher"
    },
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now,
    },
});
module.exports = mongoose.model("admin", AdminSchema);