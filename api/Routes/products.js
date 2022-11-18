const router = require("express").Router();
const Product = require("../Model/Product");

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    const p = product.map((p) => {
      return {
        method: "GET",
        url: "http://localhost:3000/products",
        body: { name: p.name, price: p.price, _id: p._id },
      };
    });
    res.status(200).json(p);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
    });
    newProduct.save(newProduct);
    res.status(201).json({
      message: "post a product",
      request: {
        method: "POST",
        url: "http://localhost:3000/products",
        body: { name: newProduct.name, price: newProduct.price },
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.json({
      message: "get product by ID",
      request: {
        method: "GET",
        url: "http://localhost:3000/products/" + productId,
        body: { name: product.name, price: product.price, _id: product._id },
      },
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.patch("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const update = {
      name: req.body.name,
      price: req.body.price,
    };
    const updatedProduct = await Product.findByIdAndUpdate(productId, update, {
      returnDocument: "after",
    });

    res.json({
      message: "Edit a product",
      request: {
        method: "PATCH",
        url: "http://localhost:3000/products/" + productId,
        body: {
          name: updatedProduct.name,
          price: updatedProduct.price,
          _id: updatedProduct._id,
        },
      },
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const removedProduct = await Product.findByIdAndRemove(productId);
    res.json({
      message: "Deleted Product",
      request: {
        method: "DELETE",
        url: "http://localhost:3000/products/" + productId,
        body: {
          name: removedProduct.name,
          price: removedProduct.price,
          _id: removedProduct._id,
        },
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
