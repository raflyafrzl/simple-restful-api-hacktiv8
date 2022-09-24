const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const fs = require("fs");
const auth = require("./auth");

//read file
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/data/simple-data-placeholder.json`, "utf-8")
);

app.use(express.json());

app.get("/api/v1/todo", auth, (req, res) => {
  res.send({
    status: "success",
    total: data.length,
    data,
  });
});

app.post("/api/v1/todo", (req, res) => {
  const { username, password } = req.body;

  const tokenJwt = jwt.sign({ username, password }, process.env.JWT_KEY);

  res.status(201).send({
    message: tokenJwt,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening to " + process.env.PORT);
});
