const Customer = require("../models/customerModel");

exports.withdrawController = (req, res) => {
  const id = req.params.id;
  let { amount } = req.body;
  amount = amount.trim();
  Customer.findOne({ accNo: id })
    .then((response) => {
      // console.log(`Current Balance: ${response.currentBal}`);
      // console.log(`Negated Amount: ${Number(-amount)}`);
      const snapshotOfCurrentBalance = response.currentBal + Number(-amount);
      if (snapshotOfCurrentBalance < 0) throw Error("Insufficient Funds!");
      // console.log(`Snapshot of Balance: ${snapshotOfCurrentBalance}`);
      Customer.findOneAndUpdate(
        { accNo: id },

        {
          $inc: { currentBal: Number(-amount) },

          $push: {
            transactions: {
              transactionType: "debit",
              transactionDetails: {
                transferredFrom: "Self",
                transferredTo: "Self",
                balance: snapshotOfCurrentBalance,
                amount: Number(amount),
              },
            },
          },
        }
      )
        .then((response) => {
          // console.log(`After: ${response}`);
          res.json(response);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
