const mongoose = require('mongoose')

const RegisterationSchema = new mongoose.Schema({
    type:{
        type:String,
        default:"student"
    },
    status:{
        type:String,
        default:"applicant",
    },
    teacher:{
        type:String,
        default:null
,    },
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    gender:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        default:null,
    },
    phone:{
        type: String,
    },
    address:{
        type:String,
    },
    //year of birth
    yob:{
        type:String,
        default:""
    },
    //filed applicant apply for
    field:{
        type: String,
    },
    zoom:{
        type: String,
    },
    skype:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    lastattendence:{
        type:String,
        default:"",
    },
    attendence:{
        type:Array,
    }
});

module.exports = mongoose.model("registeration", RegisterationSchema);
