const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Order", OrderSchema);
