const { Router } = require('express');
// const express = require('express'); // next 3 lines are equal on 1 line.
// const router = express.Router;
//const Router = require ('express').Router;

const isAuthenticated = require('./middlewares/isAuthenticated');
const isGuest = require('./middlewares/isGuest');

const productController = require('./controllers/productCotroller');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController) //('/products', productController) - това е по-добрия вариант
router.use('/accessories', accessoryController);

router.get('*', (req, res) => {
    res.render('404');
})


module.exports = router;