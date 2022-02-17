// Dependencies
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

/**
 * @desc    Register a new user
 * @route   Post /api/users/register
 * @access  Public
 */
const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    res.status(400);
    throw new Error("Email is already registered.");
  }
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    res.status(400);
    throw new Error("Username is already taken.");
  }

  // Get the hash password
  const hashPassword = await bcrypt.hash(password, 12);

  // Create a new user
  const user = await User.create({
    fullName,
    email,
    username,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc    Auth user & get token
 * @route   Post /api/users/login
 * @access  Public
 */
const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check the username from the database
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  // Check the hash password
  const isMatch = await bcrypt.compare(password, user.password);
  if (user && isMatch) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

/**
 * @desc    Get user profile
 * @route   Post /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

/**
 * @desc    Get all users
 * @route   Post /api/users/profile
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

/**
 * @desc    Delete a user
 * @route   Post /api/users/delete/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User remove successfully." });
  } else {
    res.status(401);
    throw new Error("User not found.");
  }
});

module.exports = {
  userRegister,
  userLogin,
  getUserProfile,
  getUsers,
  deleteUser,
};
