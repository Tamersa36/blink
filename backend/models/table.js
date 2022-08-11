const mongoose = require('mongoose');

const tablesSchema = mongoose.Schema({
  tableId:{type: String, required: true},
  password:{type: String, required: true}
});

module.exports = mongoose.model('table', tablesSchema);
