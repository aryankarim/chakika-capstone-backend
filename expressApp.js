const express = require('express')
const app = express()


app.use("/user", require("./routes/user"));
app.use("/search", require("./routes/search"));


module.exports = app