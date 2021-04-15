const express = require('express')
const app = express()
const auth = require('./middlewares/auth')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("cors")());

app.get("/authenticate", auth, (req, res) => {
    res.json({ message: "verified" })
})

app.use("/request", require("./routes/request"));
app.use("/category", require("./routes/category"));
app.use("/user", require("./routes/user"));
app.use("/search", require("./routes/search"));


module.exports = app