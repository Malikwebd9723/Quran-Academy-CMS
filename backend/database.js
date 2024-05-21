const mongoose = require("mongoose");
require("dotenv").config()
const connectToMongoose = async () => {
    try {
        await mongoose.connect("mongodb+srv://malikusman:malikusmancms@cluster0.uhyzy4o.mongodb.net/cms", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectToMongoose;