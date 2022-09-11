const express = require("express");

const Menu = require('../models/menu');

const router = express.Router();


//get all items
router.get("/api/menuItems", (req, res, next) => {
  Menu.find().then((docs) => {
    res.status(200).json({
      message: "table fetched successfully!",
      menu: docs,
    });
  });
});

//CRUD operations on Menu
router.post("/api/addMenuItem", (req, res, next) => {
  const menu = new Menu({
    item: req.body.item,
  });
  menu.save();
  res.status(201).json({
    message: "item added successfully!",
  });
});

router.get("/api/deleteMenuItem", (req, res, next) => {
  const filter = {
    item: req.query.item,
  };
  Menu.findOneAndDelete(filter).then((docs) => {
    res.status(200).json({
      message: "item Deleted successfully!",
    });
  });
});

module.exports = router;
