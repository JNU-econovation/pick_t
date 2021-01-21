const express = require('express')
const dotenv = require('dotenv') //.env 파일에서 process.env로 환경 변수를 로드하는 모듈
const connectDB = require('./config/db')
const colors = require('colors') //터미널에 컬러를 넣어 보여
const morgan = require('morgan') // HTTP request logger middleware(로그 포맷을 지정)
const router = require('./routes/user')

const app = express();

app.use(morgan('dev')); //로그 포맷을 'dev'지정

app.use(express.json({})); //Express v4.16.0 부터는 json으로 이루어진 request body를 받기 위해서 body-parser가 아닌 express.json 사용
app.use(express.json({
    express: true
}))


// use dotenv file for DB connection
dotenv.config({
    path:'./config/config.env'
});

connectDB();

app.use('/api/pickt/auth', router);

const PORT = process.env.PORT || 3001;
app.listen(PORT,
    console.log(`Server running mode on port ${PORT}`.red.underline.bold)
);
