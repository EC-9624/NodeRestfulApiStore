const router = require("express").Router();
const Order = require("../Model/Order");
const Product = require("../Model/Product");

router.get("/", async (req, res) => {
  try {
    const result = await Order.find();
    const doc = result.map((doc) => {
      return {
        method: "GET",
        url: "http://localhost:3000/orders/" + doc._id,
        body: { _id: doc._id, product: doc.product, quantity: doc.quantity },
      };
    });
    res.status(200).send(doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findById(productId).catch((err) => {
      res.status(404).json({ message: "Product not Found", erorr: err });
    });

    const order = new Order({
      product: product._id,
      quantity: req.body.quantity,
    });

    const newOrder = await order.save();

    res.status(201).json({
      Method: "POST",
      url: "http://localhost:3000/orders",
      body: {
        _id: newOrder._id,
        product: newOrder.product,
        quantity: newOrder.quantity,
      },
    });
  } catch (err) {
    let error = null ? err : "Product not Found";

    res.status(500).json({ message: "Something went Wrong", error: error });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    res.status(200).json({
      Method: "GET",
      url: "http://localhost:3000/orders",
      body: {
        _id: order._id,
        product: order.product,
        quantity: order.quantity,
      },
    });
  } catch (err) {
    res.status(404);
  }
});

router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const removed = await Order.findByIdAndRemove(orderId);
    if (removed == null) res.status(404).json({ message: "Order not Found" });
    res.status(200).json({ message: "Removed Order", order: removed });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
