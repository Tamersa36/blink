const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const Order = require('./models/order');

const app = express();

mongoose.connect("mongodb+srv://admin:Tamerloai123@cluster0.3gjcr.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to DB..');
})
.catch((err) => {
  console.log(err)
  console.log('Failed to connect');
});

app.use(bodyParser.json());

app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin", "*"); //Allow which domains can access our resorces
res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Access");
res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");

next();
});

app.post("/api/posts", (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully!'
  });
});

app.get('/api/posts', (req, res, next)=>{
    Post.find()
    .then(docs =>{
      res.status(200).json({
        message: 'posts fetch successfully!',
        posts: docs
      });
    });
});



app.post("/api/orders", (req, res, next)=>{
  const order = new Order({
    tableId: req.body.tableId,
    content: req.body.content,
    status: req.body.status
  });
  order.save();
  res.status(201).json({
    message: 'Order added successfully!'
  });
});

app.get('/api/orders', (req, res, next)=>{
  Order.find()
    .then(docs =>{
      res.status(200).json({
        message: 'Order fetched successfully!',
        orders: docs
      });
    });
});

app.get('/api/order', (req, res, next)=>{
  const filter = { 'status': "CREATED" };
  const update = {'status': "FINISHED"};
  Order.findOneAndUpdate(filter,update)
    .then(docs =>{
      res.status(200).json({
        message: 'Order fetched successfully!',
        orders: docs
      });
    });
});

module.exports = app;
