const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({

    transactionType: {
      type: String,
    },
    transactionDetails: {
      transferredFrom: {
        type: String,
        default: "",
      },
      transferredTo: {
        type: String,
        default: "",
      },
      balance: {
        type: Number,
        default: 0,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  },{
    timestamps: true,
  }
);

const customerSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username name"],
    },
    name: {
      type: String,
      required: [true, "Please provide a customer name"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide a Date of Birth"],
    },
    gender: {
      type: String,
      required: true,
      default: ""
    },
    address: {
      type: String,
      default: "Delhi",
    },
    accNo: {
      type: String,
      required: true,
      default: mongoose.Types.ObjectId,
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    transactions: [transactionSchema],
    currentBal: {
      type: Number,
      required: [true, "Please provide a valid balance"],
      default: 0,
      min: 0,
    },
    accountType: {
      type: String,
      required: [true, "Please provide a valid account type"],
      default: 'savings'
    },
    imgUrl: {
      type: String,
      required: true,
      default: ""
    },
    cardNumber:{
      type:String,
    },
  }, {
  timestamps: true,
}
);

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
