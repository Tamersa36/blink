const express = require("express");

const Table = require("../models/table");

const router = express.Router();

//get all tables
router.get("/api/tables", (req, res, next) => {
  Table.find().then((docs) => {
    res.status(200).json({
      message: "table fetched successfully!",
      tables: docs,
    });
  });
});

//admin fetch
//check if table exist in DB with status OCCUPIED and admin false (admin fetch)
router.get("/api/occupiedTables", (req, res, next) => {
  const filter = { status: "OCCUPIED", admin: false };
  const update = { admin: true };
  Table.findOneAndUpdate(filter, update).then((docs) => {
    res.status(200).json({
      message: "table fetched successfully!",
      table: docs,
    });
  });
});

//admin fetch
//check if table exist in DB with status EMPTY and admin true and update it to false
router.get("/api/leaveTable", (req, res, next) => {
  const filter = { status: "EMPTY", admin: true };
  const update = { admin: "false" };
  Table.findOneAndUpdate(filter, update).then((docs) => {
    res.status(200).json({
      message: "table left!",
      table: docs,
    });
  });
});

//client fetch
//check if table exist in DB with status EMPTY and update it
router.get("/api/table", (req, res, next) => {
  const filter = {
    tableId: req.query.tableId,
    password: req.query.password,
    status: "EMPTY",
  };
  const update = { status: "OCCUPIED" };
  Table.findOneAndUpdate(filter, update).then((docs) => {
    res.status(200).json({
      message: "table fetched successfully!",
      table: docs ? "true" : "false",
    });
  });
});

//client fetch
//check if table exist in DB with status OCCUPIED and exist in admin dashboard (admin true) and update it
router.get("/api/updateTableStatus", (req, res, next) => {
  const filter = {
    tableId: req.query.tableId,
    status: "OCCUPIED",
    admin: true,
  };
  const update = { status: "EMPTY" };
  Table.findOneAndUpdate(filter, update).then((docs) => {
    res.status(200).json({
      message: "Order fetched successfully!",
      table: docs,
    });
  });
});

//CRUD operations on table
router.post("/api/addTable", (req, res, next) => {
  const table = new Table({
    tableId: req.body.tableId,
    password: req.body.password,
  });
  const filter = { tableId: req.body.tableId };
  const tableExist = Table.findOne(filter);
  if (tableExist) return res.send({ message: "Table Exists" });
  try {
    table.save();
    res.status(201).json({
      message: "table added successfully!",
    });
  } catch (error) {
    return res.json({ message: "Error!" });
  }
});

router.get("/api/deleteTable", (req, res, next) => {
  const filter = {
    tableId: req.query.tableId,
  };
  Table.findOneAndDelete(filter).then((docs) => {
    res.status(200).json({
      message: "table Deleted successfully!",
    });
  });
});

router.post("/api/editTable", (req, res, next) => {
  const table = new Table({
    tableId: req.body.tableId,
    password: req.body.password,
  });
  const filter = {
    tableId: req.body.tableId,
  };
  const update = { tableId: "wew", password: "wew" };
  Table.findOneAndUpdate(filter, update).then((docs) => {
    res.status(201).json({
      message: "table updated successfully!",
    });
  });
});

module.exports = router;
