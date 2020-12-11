const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return callback(err);
      }
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
