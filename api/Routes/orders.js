const router = require("express").Router();

router.get("/", (req, res) => {
  try {
    res.status(200).send("get all order");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:orderId", (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:orderId", (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:orderId", (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
