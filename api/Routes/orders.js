const router = require("express").Router();
const Order = require("../Model/Order");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Order.find());
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const order = new Order({
      product: req.body.productId,
      quantity: req.body.quantity,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    res.status(200).json(await Order.findById(orderId));
  } catch (err) {
    res.status(404).json(err);
  }
});

router.patch("/:orderId", (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const removed = await Order.findByIdAndRemove(orderId);

    res.status(200).json(removed);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
