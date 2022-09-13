const Customer = require("../models/customerModel");

exports.indexController = (req, res) => {
  Customer.find()
    .sort("name")
    .exec((err, customers) => {
      if(!err){
        res.send(customers);
      }else{
        res.status(500).send("something went wrong");
      }
    });
};
