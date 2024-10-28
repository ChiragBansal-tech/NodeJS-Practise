const express = require('express');
const User = require('../models/    user');
const { validateToken } = require('../services/authentication');
const router = express.Router();

function checkAuth(req, res, next){
    if(req.session.user){
        next();
    }
    else{
        return res.redirect('./user/signin');
    }

    // const token = req.cookies.token;
    // if(token){
    //     try{
    //         const user = validateToken(token);
    //         req.user = user;
    //         next();
    //     }
    //     catch(err){
    //         return res.redirect('./user/signin');
    //     }
    // }
    // else{
    //     return res.redirect('./user/signin');
    // }
}

router.get('/signin', (req, res) => {
    return res.render('Signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        const user = validateToken(token); 

        req.session.user = { _id: user._id, fullName: user.fullName };

        return res.cookie('token', token).redirect('/');
    } catch (error) {
        return res.render('signin', {
            error: 'Incorrect Email or Password',
        });
    }
});


router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    const newUser = await User.create({
        fullName,
        email,
        password,
    });
    req.session.user = { _id: newUser._id, fullName: newUser.fullName };
    return res.redirect("/", { user: req.session.user });
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    return res.clearCookie('token').redirect('/user/signin');
});

module.exports = router;