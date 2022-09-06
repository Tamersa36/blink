const mongoose = require("mongoose");

const tablesSchema = mongoose.Schema({
  tableId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true, default: "EMPTY" },
  admin: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("table", tablesSchema);
