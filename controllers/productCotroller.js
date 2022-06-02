const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const { validateProduct } = require('./helpers/productHelpers');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            // console.log(products);
            res.render('home', { title: 'Brouse', products });
        })
        .catch(() => res.status(500).end())
});

router.get('/create', isAuthenticated, (req, res) => {

    res.render('create', { title: 'Create' });

});

router.post('/create', isAuthenticated, (req, res, next) => {
    console.log(req.user._id);
    productService.create(req.body, req.user._id) //тук е двя пъти user заради това, че съм объркала при създаването на токена (authService - let token =.. съм задала пропърти user_id вместо само _id)
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

router.get('/details/:productId', async (req, res) => { //we can build this with promise to
    let product = await productService.getOneWithAccessories(req.params.productId);

    res.render('details', { title: 'Product Details', product });
});

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllWthout(product.accessories);

    res.render('attachAccessory', { product, accessories });
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
});

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('editCube', product);
        });
});

router.post('/:productId/edit', isAuthenticated, validateProduct, (req, res) => {
    //TODO: validate
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/products/details/${req.params.productId}`);
        })
        .catch(error => {
            console.log(error);
        })
});

router.get('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
    .then(product => {
        if(req.user._id != product.creator){
            res.redirect('/products')
        } else{
            res.render('deleteCube', product);
        }
      
    });
});

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    productService.deleteOne(req.params.productId)
        .then(response => res.redirect('/products'));
});

// router.post('/:productId/delete', isAuthenticated, (req, res) => {  // пример как да се чейнват заявки - в един конролер може да има повече от една заявка до сървъра
//     productService.getOne(req.params.productId)
//     .then(product => {
//         if (product._id != req.user._id) {
//             res.redirect('products');
//         }
//         return productService.deleteOne(req.params.productId) 
//     }).then(response => res.redirect('/products'));
// });

module.exports = router;