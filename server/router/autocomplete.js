const express = require("express");
const router = express.Router();
const keyword = require("../data/keyword.json");

router.get("/", (req, res) => {
  const searchKeyword = req.query.keyword;
  const autoCompletionKeyword = keyword.filter((e) => e.keyword.includes(searchKeyword));
  res.json(autoCompletionKeyword);
});

module.exports = router;
