const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");

app.use(cors());


app.get("/", function (req, res) {
    res.send("<h1 style='font-size: 5rem'>this is form the server</h1>")
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})