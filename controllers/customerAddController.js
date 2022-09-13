const { response } = require("express");
const Customer = require("../models/customerModel");
const moment = require('moment');
const cardGen = require('card-number-generator')

let cardNumber = "";
exports.customerAddController = async(req, res) => {
  // console.log(req.body);
  const { username, name, address, dob, email, currentBal, accountType, phone, imgUrl, gender } = req.body;
  if (accountType === 'savings') {
    if (currentBal < 1000) {
      cardNumber=cardGen({issuer: 'Visa'});
      return res.status(404).json('need to add atleast 1000')
    }
  }

  if (accountType === 'current') {
    if (currentBal < 100000) {
      return res.status(404).json('need to add atleast 100000')
    }
    let { AgeFromDateString } = require('age-calculator');
    let age = new AgeFromDateString(dob).age;
    if (age < 18) {
      return res.status(404).json('Age must be greater than 18');
    }
  }


  if(accountType === 'homeloan' || accountType === 'carloan' || accountType === 'personalloan' || accountType === 'businessloan')
  {
    let { AgeFromDateString } = require('age-calculator');
    let age = new AgeFromDateString(dob).age;
    if (age < 25) {
      return res.status(404).json('Age must be greater than 25');
    }
    
    let rembal=parseInt(currentBal)*(0.4);
    if(rembal<500000)
      return res.status(404).json("Loan balance must be greater than 500000");
  }

  let percentage = 7;
  if (accountType === 'homeloan') {
    percentage = 7;
  }
  if (accountType === 'carloan') {
    percentage = 8;
  }
  if (accountType === 'personalloan') {
    percentage = 12;
  }
  if (accountType === 'businessloan') {
    percentage = 15;
  }

  const isExist = await Customer.findOne({ email: email });
  if(!isExist) {
    return res.status(500).send(`no account is associated with ${email}`);
  }

  const customer = new Customer({
    username: username,
    name: name,
    email: email,
    address: address,
    dob: dob,
    currentBal: currentBal,
    accountType: accountType,
    phone: phone,
    imgUrl: imgUrl,
    gender: gender,
    cardNumber:cardNumber
  });

  customer.save((err, result) => {
    if (err !== null && err.name === "ValidationError") {
      // console.log(err);
      res.json({ message: err._message });
    } else {
      // console.log(result);
      res.json({ message: result });
    }
  });
};