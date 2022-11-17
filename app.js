const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const productRutes = require("./api/Routes/products");
dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/products", productRutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Conected!");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Sever is Running on Port:${port}....`);
});
