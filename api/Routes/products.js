const router = require("express").Router();
const Product = require("../Model/Product");

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    const p = product.map((p) => {
      return {
        name: p.name,
        price: p.price,
        _id: p._id,
        request: { method: "GET", url: "http://localhost:3000/products" },
      };
    });

    res.status(200).json({
      message: "Retrieved all Product",
      result: p,
    });
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
      result: {
        name: newProduct.name,
        price: newProduct.price,
        request: { method: "POST", url: "http://localhost:3000/products" },
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
      result: {
        name: product.name,
        price: product.price,
        _id: product._id,
        request: {
          method: "GET",
          url: "http://localhost:3000/products/" + productId,
        },
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
      result: {
        name: updatedProduct.name,
        price: updatedProduct.price,
        _id: updatedProduct._id,
        request: {
          method: "PATCH",
          url: "http://localhost:3000/products/" + productId,
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
      result: {
        name: removedProduct.name,
        price: removedProduct.price,
        _id: removedProduct._id,
        request: {
          method: "DELETE",
          url: "http://localhost:3000/products/" + productId,
        },
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
