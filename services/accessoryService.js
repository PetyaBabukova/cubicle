const Accessory = require('../models/Accessory');

function getAll() {
    return Accessory.find().lean()
}

function getAllWthout(ids) { //getAllUnAttached
    return Accessory.find({_id: {$nin: ids} }).lean() // mongodb operators. this is standert mongodb way, but it works in mongoose to.
}

function create(data) {
    let accessory = new Accessory(data);

    return accessory.save();
}

module.exports = {
    getAll,
    getAllWthout,
    create,
}