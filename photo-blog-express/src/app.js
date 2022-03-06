const express = require('express');
const dotenv = require('dotenv');

const { sequelize } = require('../models');
const morgan = require('morgan');
dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(morgan('dev'));
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('연결 성공');
  })
  .catch(() => {
    console.log('에러');
  });

app.get('/', (req, res) => {
  console.log('서버 실행');
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
