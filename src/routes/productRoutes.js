// External Imports
const router = require("express").Router();

// Internal Imports
const {
  createProduct,
  listProduct,
  deleteProduct,
  detailsProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// User route
router.post("/create", protect, admin, createProduct);
router.get("/", listProduct);
router.get("/:id", detailsProduct);
router.delete("/delete/:id", protect, admin, deleteProduct);

module.exports = router;
