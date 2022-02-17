// Dependencies
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

/**
 * @desc    Create new order
 * @route   Post /api/orders/create
 * @access  Private
 */

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items.");
  } else {
    const newOrder = new Order({
      orderItems,
      user: req.user._id,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @desc    Get Order Details
 * @route   Get /api/orders/order/:id
 * @access  Private
 */

const getOrderDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

/**
 * @desc    Get Order Details by User
 * @route   Get /api/orders/myOrders
 * @access  Private
 */

const getMyOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("There is no order.");
  }
});

module.exports = { createOrder, getOrderDetails, getMyOrder };
