const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  tableId: { type: String, required: true },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ["CREATED", "COMPLETED", "CLOSED"],
    default: "CREATED",
  },
  createdAt: { type: Date, default: Date.now },
  closedAt: { type: Date },
});

module.exports = mongoose.model("Order", ordersSchema);
