const express = require("express");
const router = express.Router();
const subSearchList = require("../data/sub-search-list.json");

router.get("/", (req, res) => {
  res.json(subSearchList);
});

module.exports = router;
