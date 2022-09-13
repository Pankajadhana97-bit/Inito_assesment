const UserModel = require("../models/userModel.js");
const bcrypt = require("bcrypt"); 
const jwt  = require('jsonwebtoken')

// register a user 
exports.registerUser = async (req, res) => {
  const { username, password , fullname, email, phonenumber, DOB, address}=req.body
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  try {
    const oldUser=await UserModel.findOne({ email })

    if(oldUser)
    {
      return res.status(400).json({message:"username already exists"})
    }
    const user = await newUser.save();
    const token=jwt.sign({
      email:user.email,id:user._id
    },process.env.JWT_KEY,{
      expiresIn: "1m"
    });
    res.status(200).json({user,token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};