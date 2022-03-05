import * as express from 'express';
import * as dotenv from 'dotenv';

const {sequelize} = require('../models');
const morgan = require('morgan');
dotenv.config();
const app:express.Express = express();

const port = process.env.PORT;

app.use(morgan('dev'))
sequelize.sync({force:false})
    .then(()=>{console.log('연결 성공')})
    .catch(()=>{console.log('에러')})


app.get('/',(req:express.Request,res:express.Response)=>{
    console.log('서버 실행')
    res.send('hello world')
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
