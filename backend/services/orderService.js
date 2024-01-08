// orderService.js
const Order = require("../models/order");

const saveOrderToDB = async (tableId, content, status) => {
  const order = new Order({
    tableId: tableId,
    content: content,
    status: status,
  });

  try {
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    console.error(`Error saving order: ${error}`);
    throw error;
  }
};

module.exports = { saveOrderToDB };
