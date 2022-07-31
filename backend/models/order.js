const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
  tableId:{type: String, required: true},
  content:{type: String, required: true},
  status:{type: String, required: true, default: "CREATED"}
});

module.exports = mongoose.model('Order', ordersSchema);
