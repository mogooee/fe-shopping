const express = require("express");
const router = express.Router();
const todaysHot = require("../data/todays-hot.json");

router.get("/", (req, res) => {
  res.json(todaysHot);
});

module.exports = router;
