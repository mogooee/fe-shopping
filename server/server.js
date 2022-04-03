const express = require("express");
const path = require("path");
const index = require("./router/index.js");
const autocomplete = require("./router/autocomplete.js");
const subSearchList = require("./router/sub-search-list.js");
const todaysHot = require("./router/todays-hot.js");
const categoryOptions = require("./router/category-option.js");
const categoryDetailOptions = require("./router/category-detail-option.js");
const app = express();
const port = 3000;

app.use(express.static(path.resolve("client")));
app.use("/", index);
app.use("/autocomplete", autocomplete);
app.use("/list/sub-search", subSearchList);
app.use("/list/todays-hot", todaysHot);
app.use("/option/category", categoryOptions);
app.use("/option/detail-category", categoryDetailOptions);

app.listen(port, () => {
  console.log(`hearing on http://localhost:${port}/`);
});
