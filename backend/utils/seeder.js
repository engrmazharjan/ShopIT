const Product = require("../models/productModel");
const dotenv = require("dotenv");
const connectDB = require("../config/database");

const products = require("../data/products");

// Setting Up dotenv File
dotenv.config({ path: "backend/config/.env" });

connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products Are Deleted");

    await Product.insertMany(products);
    console.log("All Products Are Added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
