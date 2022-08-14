const express = require("express");

const User = require('../models/user');

const router = express.Router();

//user login
router.get('/api/user', (req, res, next)=>{
  const filter = { 'userName': req.query.userName ,'password': req.query.password };
  User.findOne(filter)
    .then(docs =>{
      res.status(200).json({
        message: 'user fetched successfully!',
        user: docs? "true":"false"
      });
    });
});

module.exports = router;
