const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const Blog = require('./models/blogs')
const app = express()
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogify').then(e => console.log('MongoDb Connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'someSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    // const user = req.session.user;
    res.render('home', {
        user: req.session.user,
        blogs: allBlogs,
    });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => console.log(`Server startd at PORT: ${PORT}`));