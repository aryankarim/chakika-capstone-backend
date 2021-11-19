const app = require('./expressApp');
const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server listening on port 8000');
});
