const Cube = require('../models/Cube');


async function getAll(query) {
    //After mongoose building:
    let products = await Cube.find({}).lean(); //without lean doesnt work

    console.log(products);

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
    return Cube.findById(id).lean();
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