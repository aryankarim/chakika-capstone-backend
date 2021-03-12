const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("cors")());

app.use("/user", require("./routes/user"));
app.use("/search", require("./routes/search"));


module.exports = app