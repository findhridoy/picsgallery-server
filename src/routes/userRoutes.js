// External Imports
const router = require("express").Router();

// Internal Imports
const {
  userRegister,
  userLogin,
  getUserProfile,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// User route
router.post("/register", userRegister);
router.post("/login", userLogin);
router.route("/profile").get(protect, getUserProfile);
router.route("/").get(protect, admin, getUsers);
router.route("/delete/:id").delete(protect, admin, deleteUser);

module.exports = router;
