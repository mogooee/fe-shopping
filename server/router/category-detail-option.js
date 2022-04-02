const express = require("express");
const router = express.Router();
const categoryDetailOptions = require("../data/category-detail-options.json");

router.get("/", (req, res) => {
  res.json(categoryDetailOptions);
});

module.exports = router;
