const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const fileRoutes = require('./routes/fileroutes');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/upload',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

app.set("view engine", 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.resolve('./uploads')));

app.use('/', fileRoutes);

app.listen(PORT, () => console.log("Server Started"))