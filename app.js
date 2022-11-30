const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const productRoutes = require("./api/Routes/products");
const orderRoutes = require("./api/Routes/orders");
dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use(express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Conected!");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Sever is Running on Port:${port}....`);
});
