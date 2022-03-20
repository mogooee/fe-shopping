const express = require("express");
const path = require("path");
const index = require("./router/index.js");
const autocomplete = require("./router/autocomplete.js");
const app = express();
const port = 3000;

app.use(express.static(path.resolve("client")));
app.use("/", index);
app.use("/autocomplete", autocomplete);

app.listen(port, () => {
  console.log(`hearing on http://localhost:${port}/`);
});
