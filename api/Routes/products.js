const router = require("express").Router();
const Product = require("../Model/Product");

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    const p = product.map((p) => {
      return {
        method: "GET",
        url: "http://localhost:3000/products/" + p._id,
        body: { name: p.name, price: p.price },
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
      request: {
        message: "get product by ID",
        method: "GET",
        url: "http://localhost:3000/products/" + productId,
        body: { name: product.name, price: product.price },
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
      request: {
        message: "Edit a product",
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
      request: {
        message: "Deleted Product",
        method: "DELETE",
        url: "http://localhost:3000/products/" + productId,
        body: {
          name: removedProduct.name,
          price: removedProduct.price,
        },
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
