const express = require("express");
const router = express.Router();
const keyword = require("../data/keyword.json");

router.get("/", (req, res) => {
  const inputKeyword = req.query.keyword;
  const autoCompletionKeyword = keyword.filter((e) => e.keyword.includes(inputKeyword));
  res.json(autoCompletionKeyword);
});

module.exports = router;
