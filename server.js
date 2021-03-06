const path = require('path');
const express = require('express');

const app = express();
const mockApiMiddleware = require('express-mock-api-middleware')(
  path.resolve(__dirname, 'mock'),
  { ignore: ['asm.js'] }
);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/', mockApiMiddleware);

const host = 'localhost';
const port = 4000;

app.listen(port, host, error => {
  if (error) {
    console.error(error);
    return;
  }
  console.info(`http://${host}:${port}`);
});
