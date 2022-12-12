const router = require("express").Router();
const Product = require("../Model/Product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    const p = product.map((p) => {
      return {
        method: "GET",
        url: "http://localhost:3000/products/" + p._id,
        body: {
          name: p.name,
          price: p.price,
          productImage: p.productImage,
        },
      };
    });
    res.status(200).json(p);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Songthing went Wrong", error: err.message });
  }
});

router.post("/", upload.single("productImage"), async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path,
    });
    await newProduct.save();
    console.log(req.file);
    res.status(201).json({
      message: "post a product",
      request: {
        method: "POST",
        url: "http://localhost:3000/products",
        body: {
          name: newProduct.name,
          price: newProduct.price,
          productImage: newProduct.productImage,
        },
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went Wrong", error: err.message });
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
        url: "http://localhost:3000/products/",
        body: {
          name: product.name,
          price: product.price,
          productImage: product.productImage,
        },
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went Wrong", error: err.message });
  }
});

router.patch("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const update = {
      name: req.body.name,
      price: req.body.price,
      productImage: req.file,
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
          productImage: updatedProduct.productImage,
          _id: updatedProduct._id,
        },
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Songthing went Wrong", error: err.message });
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
          productImage: removedProduct.productImage,
        },
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went Wrong", error: err.message });
  }
});

module.exports = router;
