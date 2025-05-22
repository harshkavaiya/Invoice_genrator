// routes/invoiceRoutes.js
const express = require("express");
const router = express.Router();
const Invoice_Master = require("../models/Invoice_Master");
const Invoice_Detail = require("../models/Invoice_Detail");

// Save invoice with details
router.post("/", async (req, res) => {
  const { Customer_name, total_amount, products } = req.body;

  console.log("Received data:", req.body);

  try {
    const lastInvoice = await Invoice_Master.findOne().sort({ Invoice_no: -1 });

    const newInvoice = new Invoice_Master({
      Invoice_no: lastInvoice ? lastInvoice.Invoice_no + 1 : 1,
      CustomerName: Customer_name,
      TotalAmount: total_amount,
    });

    const savedInvoice = await newInvoice.save();

    const details = products.map((item) => ({
      Invoice_Id: savedInvoice._id,
      Product_Id: item.Product_Id,
      Rate: item.Rate,
      Unit: item.Unit,
      Qty: item.Qty,
      Disc_Percentage: item.Disc_Percentage,
      NetAmount: item.NetAmount,
      TotalAmount: item.TotalAmount,
    }));

    const newInvoiceDetail = new Invoice_Detail({
      Invoice_Id: savedInvoice._id,
      Invoice_no: savedInvoice.Invoice_no,
      Products: products.map((item) => ({
        Product_Id: item.Product_Id,
        Product_Name: item.product_name,
        Rate: item.rate,
        Unit: item.unit,
        Qty: item.qty,
        Disc_Percentage: item.disc_percentage,
        NetAmount: item.net_amount,
        TotalAmount: item.total_amount,
      })),
    });

    await newInvoiceDetail.save();

    res.status(201).json({ message: "Invoice saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save invoice" });
  }
});

module.exports = router;
