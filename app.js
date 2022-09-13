const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const { verify } = require('./TokenVerifier/tokenVerify');
const { loginUser } = require('./controllers/loginController.js');
const { registerUser } = require('./controllers/registerController.js');
const { indexController } = require("./controllers/indexController");
const { customerDisplayController } = require("./controllers/customerDisplayController");
const { customerAddController } = require("./controllers/customerAddController");
const { addFundsController } = require("./controllers/addFundsController");
const { withdrawController } = require("./controllers/withdrawController");
const { displayTransactionsController } = require("./controllers/displayTransactionsController");
const { transferFundsController } = require("./controllers/transferFundsController");

app.use(express.json());

const connection = mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.get("/",verify, indexController);
app.get("/customers/:id",verify,  customerDisplayController);
app.get("/customers/:id/transactions",verify,  displayTransactionsController);
app.post('/login', loginUser);
app.post('/register', registerUser);
app.post("/customers/:id/addFunds",verify,addFundsController);
app.post("/customers/:id/withdrawFunds",verify,withdrawController);
app.post("/customers/:id/transferFunds",verify,transferFundsController);
app.post("/customers",verify,customerAddController);

connection.then(() => {
  console.log("Database has been connected!");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
