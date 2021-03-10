const app = require('./expressApp');

const port = 8000 || process.env.PORT;

app.listen(port, () => {
    console.log("Server listening on port 8000");
});
