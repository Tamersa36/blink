const express = require("express");

const User = require('../models/user');

const router = express.Router();
//user login
router.get('/api/user', (req, res, next)=>{
  const filter = { 'userName': Buffer.from(req.query.Authorization, 'base64').toString('utf8').split(":")[0] };
  User.findOne(filter)
    .then(docs =>{
      res.status(200).json({
        message: 'user fetched successfully!',
        user: docs? "true":"false",
        res: docs
      });
    });
});

module.exports = router;
