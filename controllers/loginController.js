const UserModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json("Credentials are not valid");
      }
      else {
        const token = jwt.sign({
          email: user.email, id: user._id
        }, process.env.JWT_KEY)
        res.header('Authentication',token);
        res.cookie('jwt',token);
        res.status(200).send({
            message: 'logged in successfully',
            cookie: token
        });
      }
    }
    else
      res.status(404).json("User not registered");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};