const { Router } = require('express');
const productService = require('../services/productService');
const { validateProduct } = require('./helpers/productHelpers');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            console.log(products);
            res.render('home', { title: 'Brouse', products });
        })
        .catch(() => res.status(500).end())
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.get('/details/:productId', async (req, res) => { //we can build this with promise to
    let product = await productService.getOne(req.params.productId);

    res.render('details', { title: 'Product Details', product });
});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())

    // //with Callback
    // productService.create(req.body, (err) => {
    //     if (err) {
    //         return res.status(500).end();
    //     }
    //     res.redirect('/products');
    // });

    //with promise. Very, very cool! 
});

module.exports = router;