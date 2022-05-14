const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error:
        "An account with this email address has already been registered. Please log in.",
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Signup successful! Please log in." });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error:
          "User with that email address does not exist. Please register for an acoount or try logging in with a different email address.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error:
          "The email address and password provided do not match. Please try again or register for an account.",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "You are now logged out" });
};
