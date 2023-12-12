const mongoose = require("mongoose");

async function connectDB(){
	return await mongoose.connect(process.env.MANAGMENT)
}

module.exports = connectDB;