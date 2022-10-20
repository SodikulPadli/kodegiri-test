const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = require('./src/routes');

app.use(express.json());
app.use('/api/v1', router);
app.get('/', (req, res) => {
  res.send('Hello Sodikul');
});

app.listen(port, () => {
  console.log(`server is listen on port : ${port}`);
});
