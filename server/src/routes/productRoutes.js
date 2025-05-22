// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product_Master");

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Optional: Add 3–4 products (one-time use)
router.post("/seed", async (req, res) => {
  await Product.insertMany([
    { Product_Name: "Pen", Rate: 10, Unit: "pcs" },
    { Product_Name: "Pencil", Rate: 5, Unit: "pcs" },
    { Product_Name: "Notebook", Rate: 50, Unit: "nos" },
    { Product_Name: "Eraser", Rate: 3, Unit: "pcs" },
  ]);
  res.send("Products seeded");
});

module.exports = router;
