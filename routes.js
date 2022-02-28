const {Router} = require ('express');

// const express = require('express'); // this is equal on 1 line.
// const router = express.Router;
//const Router = require ('express').Router;


const router = Router();

router.get('/', (req, res)=>{
    res.render('home', {layout: false})
});

module.exports = router;