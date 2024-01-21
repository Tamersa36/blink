// socket.js
const { Server } = require("socket.io");
const orderService = require("./services/orderService");
const tableService = require("./services/tableService");
const occupied = "OCCUPIED";
const empty = "EMPTY";

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

    socket.on("table", async (tableData) => {
      try {
        const table = await tableService.enterTableMultiUsers(
          tableData.tableId,
          tableData.password
        );
        if (!table.multiUser) {
          io.emit("table", table);
          io.emit("TableActive", true);
        } else io.emit("TableActive", true);
      } catch (error) {
        console.error("Error processing table:", error);
      }
    });

    socket.on("leaveTable", async (tableId) => {
      try {
        const table = await tableService.updateTableStatus(
          tableId,
          occupied,
          empty
        );
        io.emit("DashboardTableLeft", table);
      } catch (error) {
        console.error("Error processing table:", error);
      }
    });

    socket.on("order", async (orderData) => {
      console.log({ orderData });
      try {
        let savedOrder;

        switch (orderData.type) {
          case "SendMeBill":
            savedOrder = await orderService.saveOrderToDB(
              orderData.tableId,
              orderData.content,
              orderData.status
            );
            break;

          case "NeedWater":
            savedOrder = await orderService.saveOrderToDB(
              orderData.tableId,
              orderData.content,
              orderData.status
            );
            break;

          case "CallWaiter":
            savedOrder = await orderService.saveOrderToDB(
              orderData.tableId,
              orderData.content,
              orderData.status
            );
            break;

          default:
            console.error("Unknown order type:", orderData.type);
            return;
        }

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
