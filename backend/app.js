const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ordersRoutes = require("./routes/orders");
const tablesRoutes = require("./routes/tables");
const usersRoutes = require("./routes/users");
const defaultRoutes = require("./routes/default");
const menuRoutes = require("./routes/menu");
const session = require("express-session");
const cors = require("cors");

const setTenantIdMiddleware = require("./tenantMiddleware");

const app = express();
app.use(cors());
app.use(
  session({
    secret: "mosketo",
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.3gjcr.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB..");
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Allow which domains can access our resorces
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Access"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.use(setTenantIdMiddleware);
app.use(ordersRoutes);
app.use(tablesRoutes);
app.use(usersRoutes);
app.use(menuRoutes);
app.use(defaultRoutes);

module.exports = app;
