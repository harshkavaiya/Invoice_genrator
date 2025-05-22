const mongoose = require("mongoose");

const ProductDetailSchema = new mongoose.Schema({
  Product_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Product_Master" },
  Product_Name: String,
  Rate: Number,
  Unit: String,
  Qty: Number,
  Disc_Percentage: Number,
  NetAmount: Number,
  TotalAmount: Number,
});

const InvoiceDetailSchema = new mongoose.Schema({
  Invoice_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice_Master" },
  Invoice_no: Number,
  Products: [ProductDetailSchema],
});

module.exports = mongoose.model("Invoice_Detail", InvoiceDetailSchema);
