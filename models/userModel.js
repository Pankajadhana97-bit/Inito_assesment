const mongoose =require('mongoose')

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber:{
      type : String,
      required: true
    },
    dob:{
      type : Date,
      required: true,
    },
    address:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports= UserModel; 