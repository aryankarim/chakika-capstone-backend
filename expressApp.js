const express = require('express')
const app = express()


app.use("/user", require("./routes/user"));
app.use("/homePage", require("./routes/homePage"));


module.exports = app