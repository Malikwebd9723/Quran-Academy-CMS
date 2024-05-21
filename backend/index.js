const connectToMongoose = require('./database')
const express = require('express')
const cors = require("cors")
connectToMongoose()
const app = express()
app.use(express.json())
app.use(cors())
const PORT = 4000
//route for admin to and update details
// app.use("/api/details",require("./routes/info"))
// to create admin
app.use("/api/adminregisteration", require("./routes/admin"));

//student route for registeration
app.use("/api/registeration", require("./routes/registeration"));
//route to register students
app.use("/api/registerstudent", require("./routes/registerStudent"));
//teacher route for application
app.use("/api/apply", require("./routes/apply"));
// //route to register teacher 
app.use("/api/registerteacher", require("./routes/registerTeacher"));
//student route for login
app.use("/api/login", require("./routes/login"));
//teacher route for login 
app.use("/api/teacherlogin", require("./routes/teacherlogin"));
//attendence increase and decrease
app.use("/api/attendance", require("./routes/attendance"));
//users route
app.use("/api/users", require("./routes/users"))
app.listen(PORT, ()=>{
    console.log('app is running');
})