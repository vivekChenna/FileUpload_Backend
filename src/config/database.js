const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectWithDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("something went wrong in mongodb connection");
    console.log(error);
  }
};

module.exports = {
  PORT: process.env.PORT,
  connectWithDB,
};
