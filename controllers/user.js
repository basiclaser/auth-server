// importing user model from models index file
const { User } = require("../models");

exports.createUser = async (req, res) => {
  // send back the new user
  // redirect new user to /profile
  const dbResponse = await User.create(req.body);
  console.log(dbResponse);
  return res.status(200).json({
    success: true,
    redirectUrl: "/profile",
    a: 1,
    user: { ...dbResponse, password: "nah" },
  });
};
