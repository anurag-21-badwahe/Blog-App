require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try{
    await mongoose.connect(MONGO_URL);
      console.log('MongoDB connected');
  }

  catch(error){
    console.error("Error connecting to MongoDB:", error.message);
    process.exist(1);
  };
};

module.exports = connectDB;

