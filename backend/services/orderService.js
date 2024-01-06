const Order = require("./models/order");

const saveOrderToDB = async (tableId, content, status) => {
  const order = new Order({
    tableId: tableId,
    content: content,
    status: status,
  });
  return order.save();
};

module.exports = orderSer;
