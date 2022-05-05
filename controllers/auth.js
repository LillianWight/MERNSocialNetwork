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
