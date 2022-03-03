const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs/promises');
const path = require('path');

let productsData = require('../config/products.json')

function getAll() {
    return productsData;
};

function getOne(id) {
    return productsData.find(x => x.id == id);
}

function create(data, callback) {
    //the names of the properties are comming from html-form names
    // must validate inputs before this! if(req.body.name >= ...) Всичко трябва да се валидира!
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube)

    // //asolute path!!! Be ware of async func!
    // fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), (err) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    // });

    // //with "path" and with callback
    // fs.writeFile(
    //     path.join(__dirname, '../config/products.json'),
    //     JSON.stringify(productsData),
    //     callback
    // );

    return fs.writeFile(
        path.join(__dirname, '../config/products.json'),
        JSON.stringify(productsData),
    )
};

module.exports = {
    create,
    getAll,
    getOne
}