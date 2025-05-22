const mongoose = require("mongoose");

const InvoiceMasterSchema = new mongoose.Schema({
  Invoice_no: Number,
  Invoice_Date: { type: Date, default: Date.now },
  CustomerName: String,
  TotalAmount: Number,
});

module.exports = mongoose.model("Invoice_Master", InvoiceMasterSchema);
