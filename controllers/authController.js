const { Router } = require('express');
// const {Router} = require('express').Router; // можем да го вземем ратъра така, без да го деструктурираме - обикновено при по стара версия на ноуд

const {COOKIE_NAME} = require('../config/config')

const router = Router();
// const router = require ('express').Router(); //може и така
const authService = require('../services/authService');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password })

        res.cookie(COOKIE_NAME, token);
        res.redirect('/products')

    } catch (error) {
        console.log(error);
        res.render('login', { error });
    }
});

router.get('/register', isGuest, isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest, isGuest, async (req, res) => {
    //validate
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.render('register', { message: 'Password missmatch' });
        return;
    }

    //ако е асинхронна ф-ия задължително трабва try/catch
    try {
        let user = await authService.register({ username, password });

        res.redirect('/auth/login');

    } catch (error) {
        res.render('register', { error });
    }
});

router.get('/logout', isAuthenticated, (req, res)=>{
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
});

module.exports = router;