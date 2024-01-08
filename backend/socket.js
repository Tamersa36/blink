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
      try {
        const savedOrder = await saveOrderToDB(
          orderData.tableId,
          orderData.content,
          orderData.status
        );
        io.emit("order", {
          ...savedOrder.toObject(), // Convert Mongoose document to a plain JavaScript object
          _id: savedOrder._id.toString(), // Convert _id to string
        });
      } catch (error) {
        console.error("Error processing order:", error);
      }
    });
  });
  const saveOrderToDB = async (tableId, content, status) => {
    const order = new Order({
      tableId: tableId,
      content: content,
      status: status,
    });

    try {
      const savedOrder = await order.save();
      console.log(savedOrder._id);
      console.log(`Order with ID ${savedOrder._id} saved successfully.`);
      return savedOrder;
    } catch (error) {
      console.error(`Error saving order: ${error}`);
      throw error; // Re-throw the error to be handled by the calling code
    }
  };
};
