const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Product_Name: String,
  Rate: Number,
  Unit: String,
});

module.exports = mongoose.model("Product_Master", ProductSchema);
