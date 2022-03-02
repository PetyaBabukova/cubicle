const { Router } = require('express');
const productService = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Brouse' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.get('/details/:productId', (req, res) => {

    console.log(req.params.productId);
    res.render('details', { title: 'Product Details' });
});

router.post('/create', (req, res) => {
    //TODO: Validate inputs, comming from user!
    productService.create(req.body);

    res.redirect('/products');
});

module.exports = router;