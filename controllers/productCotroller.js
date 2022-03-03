const { Router } = require('express');
const productService = require('../services/productService');
const { validateProduct } = require('./helpers/productHelpers');

const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll(req.query);

    res.render('home', { title: 'Brouse', products });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.get('/details/:productId', (req, res) => {
    let product = productService.getOne(req.params.productId)

    res.render('details', { title: 'Product Details', product });
});

router.post('/create', validateProduct, (req, res) => {

    // //with Callback
    // productService.create(req.body, (err) => {
    //     if (err) {
    //         return res.status(500).end();
    //     }
    //     res.redirect('/products');
    // });

    //with promise. Very, very cool! 
    productService.create(req.body)
    .then(() => res.redirect('/products'))
    .catch(() => res.status(500).end())
});

module.exports = router;