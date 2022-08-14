const express = require("express");

const Table = require('../models/table');

const router = express.Router();

//get all tables
router.get('/api/tables', (req, res, next)=>{
  Table.find()
    .then(docs =>{
      res.status(200).json({
        message: 'table fetched successfully!',
        tables: docs
      });
    });
});


//check if table exist in DB
router.get('/api/table', (req, res, next)=>{
  const filter = { 'tableId': req.query.tableId ,'password': req.query.password };
  Table.findOne(filter)
    .then(docs =>{
      res.status(200).json({
        message: 'table fetched successfully!',
        table: docs? "true":"false"
      });
    });
});

module.exports = router;
