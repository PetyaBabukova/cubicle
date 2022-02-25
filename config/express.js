const express = require('express');
const {engine} = require('express-handlebars');



function setupExpress(app) {
    app.engine('hbs', engine({
        extname: 'hbs'
    }));
    
    app.set('view engine', 'hbs');
    
    app.use(express.static('public'));
};

module.exports = setupExpress;