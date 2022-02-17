// External Imports
const router = require("express").Router();

// Internal Imports
const {
  createOrder,
  getOrderDetails,
  getMyOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// User route
router.route("/create").post(protect, createOrder);
router.route("/order/:id").get(protect, getOrderDetails);
router.route("/myOrder").get(protect, getMyOrder);

module.exports = router;
