const express = require('express')
const fs = require("fs")
const userRouter = require('./routes/user')
const { connectMongoDb } = require('./connection')
const { logReqRes } = require('./middlewares/index')
const app = express();
const PORT = 8001

connectMongoDb("mongodb://localhost:27017/practise");

app.use(express.urlencoded({ extended: false}));

app.use(logReqRes("log.txt"));

app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`Server started at port 8001`))