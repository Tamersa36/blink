// socket.js
const { Server } = require("socket.io");
const orderService = require("./services/orderService");

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
      try {
        const savedOrder = await orderService.saveOrderToDB(
          orderData.tableId,
          orderData.content,
          orderData.status
        );

        io.emit("order", {
          ...savedOrder.toObject(),
          _id: savedOrder._id.toString(),
        });
      } catch (error) {
        console.error("Error processing order:", error);
      }
    });
  });
};
