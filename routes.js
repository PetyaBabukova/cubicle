const {Router} = require ('express');
// const express = require('express'); // next 3 lines are equal on 1 line.
// const router = express.Router;
//const Router = require ('express').Router;

const productController = require('./controllers/productCotroller');
const aboutController = require('./controllers/aboutController');

const router = Router();

router.use('/', productController) //('/products', productController) - това е по-добрия вариант
// router.get('/', productController.index); //Това е олдфешън начина. Ивчо не го харесва, защото отговорността за раута е концентрирана само на едно място, за всеки раут може да има много екшъни и не е добре това. По добре да изнесем раута в контролера. 
// router.get('/create', productController.create);

router.use('/about', aboutController);


module.exports = router;