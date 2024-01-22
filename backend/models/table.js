const mongoose = require("mongoose");

const tablesSchema = mongoose.Schema({
  tableId: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String,
    enum: ["EMPTY","OCCUPIED"],
     default: "EMPTY" },
  admin: { type: Boolean, default: false },
  // tenantId: { type: String, required: true },
});

module.exports = mongoose.model("table", tablesSchema);
