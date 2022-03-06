const Cube = require('../models/Cube');
const productData = require('../data/productData')


function getAll(query) {
    let products = productData.getAll(); // това беше преди да изнесем някои функционалности в самия модел.

    // let products = Cube.getAll();

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search))
    }

    if (query.from) {
        products = products.filter(x => Number(x.level) >= query.from)
    }

    if (query.to) {
        products = products.filter(x => Number(x.level) <= query.to)
    }

    return products;
};

function getOne(id) {
    return productData.getOne(id); // това беше преди да изнесем някои функционалности в самия модел.

    // return Cube.getOne(id)
}

function create(data) {
    let cube = new Cube(data);
    // return productData.create(cube);
    return cube.save(); //in mongoose there is build in functionality for save
};

module.exports = {
    create,
    getAll,
    getOne
}