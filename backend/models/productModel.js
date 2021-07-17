const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
    maxLength: [100, "Product Name Cannot Exceed 100 Characters"],
  },

  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [5, "Product Price Cannot Exceed 5 Characters"],
    default: 0.0,
  },

  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please Select Category For This Product"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please Select Correct Category For Product",
    },
  },

  seller: {
    type: String,
    required: [true, "Please Enter Product Seller"],
  },

  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [5, "Product Stock Cannot Exceed 5 Characters"],
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Product", ProductSchema);
