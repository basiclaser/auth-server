require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./user");

// connect to db
// export all models in one place ( like an index )

const connectDB = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

exports.User = User;
exports.connectDB = connectDB;
