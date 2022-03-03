const fs = require('fs/promises');
const path = require('path');
let productsDb = require('../config/products.json')


module.exports = {
    getAll(){
        return productsDb
    },

    getOne(id){
        return productsDb.find(x => x.id == id )
    },

    create(product){
        productsDb.push(product)

        return fs.writeFile(
                path.join(__dirname, '../config/products.json'),
                JSON.stringify(productsDb),
            )
    },

}


    //Different patterns for writing file
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

    // // this returns promise
    // return fs.writeFile(
    //     path.join(__dirname, '../config/products.json'),
    //     JSON.stringify(productsData),
    // )