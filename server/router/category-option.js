const express = require("express");
const router = express.Router();
const categoryOptions = require("../data/category-options.json");

router.get("/", (req, res) => {
  res.json(categoryOptions);
});

module.exports = router;
