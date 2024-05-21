const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    type:{
        type:String,
        default:"teacher"
    },
    status:{
        type:String,
        default:"applicant"
    },
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
    },
    password:{
        type:String,
    },
    phone:{
        type: String,
    },
    address:{
        type:String,
    },
    certification:{
        type:String,
    },
    //year of completion
    yoc:{
        type:String,
    },
    //last teaching address
    lta:{
        type:String,
    },
    experiance:{
        type:String,
    },
    field:{
        type:String,
    },
    zoom:{
        type:String,
    },
    skype:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("teacher", TeacherSchema);