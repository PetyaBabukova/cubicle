const mongoose = require('mongoose'); 
const config = require('./config')

// TODO: In mongoose documentation there is another type of set up, with async design.
module.exports = (app) => {
    // mongoose.connect('mongodb://localhost:27017/cubicle');
    mongoose.connect(config.DB_CONNECTION);


    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection errro:'));
    db.once('open', () => console.log('Db connected!'));
}