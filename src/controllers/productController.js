// Dependencies
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
/**
 * @desc    Create new product
 * @route   Post /api/products/cerate
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const { title, description, category, subCategory, price, image } = req.body;
  const createNewProduct = new Product({
    title,
    description,
    category,
    subCategory,
    price,
    image,
    author: req.user._id,
  });
  const saveProduct = await createNewProduct.save();
  if (saveProduct) {
    res.status(201).json(saveProduct);
  } else {
    res.status(401);
    throw new Error("Unable to create a new product.");
  }
});

/**
 * @desc    Product List
 * @route   Post /api/products
 * @access  Public
 */
const listProduct = asyncHandler(async (req, res) => {
  const productList = await Product.find({});
  if (productList) {
    res.json(productList);
  } else {
    res.status(401);
    throw new Error("Product not found.");
  }
});

/**
 * @desc    Product Details
 * @route   Post /api/products/:id
 * @access  Public
 */
const detailsProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(401);
    throw new Error("Product not found.");
  }
});

/**
 * @desc    Delete a product
 * @route   Post /api/products/delete/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product remove successfully." });
  } else {
    res.status(401);
    throw new Error("Product not found.");
  }
});

module.exports = {
  createProduct,
  listProduct,
  detailsProduct,
  deleteProduct,
};
