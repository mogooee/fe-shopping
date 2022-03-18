const express = require("express");
const router = express.Router();
const keyword = require("../data/keyword.json");

router.get(`/?keyword=${keyword}`, (req, res) => {
  const autoKeyword = res.json(autoKeyword);
});

module.exports = router;
