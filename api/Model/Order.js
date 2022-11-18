const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  name: { type: String, required: true },
  qunatity: { type: Number, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
