const router = require("express").Router();
const Product = require("../Model/Product");

router.get("/", async (req, res) => {
  const product = await Product.find();
  res.status(200).json(product);
});

router.post("/", async (req, res) => {
  const newProduct = { name: req.body.name, price: req.body.price };
  res.json({ message: "post a product", result: newProduct });
});

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  res.json({ message: "get product by ID", result: productId });
});

router.patch("/:productId", async (req, res) => {
  const editedProduct = { name: req.body.name, price: req.body.price };
  res.json({ message: "Edit a product", result: editedProduct });
});

router.delete("/", async (req, res) => {
  res.json({ message: "Delete a product" });
});

module.exports = router;
