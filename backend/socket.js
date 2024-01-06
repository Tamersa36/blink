// socket.js
const { Server } = require("socket.io");
const Order = require("./models/order");

module.exports = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("message", (message) => {
      console.log(message);
      io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
    });

    socket.on("order", async (orderData) => {
      await saveOrderToDB(
        orderData.tableId,
        orderData.content,
        orderData.status
      );
      io.emit("order", orderData);
    });
  });
  const saveOrderToDB = async (tableId, content, status) => {
    const order = new Order({
      tableId: tableId,
      content: content,
      status: status,
    });
    return order.save();
  };
};
