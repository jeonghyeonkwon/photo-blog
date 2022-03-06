const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('../routes/user');
const photoRouter = require('../routes/photo');
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/photo', photoRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
