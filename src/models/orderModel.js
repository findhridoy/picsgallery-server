// External Imports
const { Schema, model } = require("mongoose");

// User Schema
const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        title: { type: String, required: true },
        product_id: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        image: { type: Object, required: true },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);
