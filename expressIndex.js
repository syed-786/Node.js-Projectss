const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.get("/about", (req, res) => {
  return res.send("This is about page " + req.query.name + " " + req.query.age);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
