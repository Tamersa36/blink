// menuSchema.js
const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  item: { type: String, required: true },
  // tenantId: { type: String, required: true },
});

module.exports = mongoose.model('Menu', menuSchema);
