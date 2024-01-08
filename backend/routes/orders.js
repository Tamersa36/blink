const express = require("express");

const router = express.Router();

const Order = require("../models/order");

const mongoose = require("mongoose");

//post api
//add new order
router.post("/api/orders", (req, res, next) => {
  const order = new Order({
    tableId: req.body.tableId,
    content: req.body.content,
    status: req.body.status,
  });
  order.save();
  res.status(201).json({
    message: "Order added successfully!",
  });
});

//Get Api's
//get all orders for testing
router.get("/api/orders", (req, res, next) => {
  Order.find().then((docs) => {
    res.status(200).json({
      message: "Order fetched successfully!",
      orders: docs,
    });
  });
});

//get first order with status created and update status
router.get("/api/order", (req, res, next) => {
  const filter = { status: "CREATED" };
  const update = { status: "FINISHED" };
  Order.findOneAndUpdate(filter, update).then((docs) => {
    res.status(200).json({
      message: "Order fetched successfully!",
      order: docs,
    });
  });
});

router.post("/api/updateOrderStatus", async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    console.log(req.body)
    console.log({orderId})
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: "COMPLETED" } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order Status Updated Successfully!",
      updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
