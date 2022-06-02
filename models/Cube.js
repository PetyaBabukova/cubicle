const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
},

    description: {
        type: String,
        required:true,
        maxlength: 50
},

    imageUrl: {
        type: String,
        required: true,
        validete:/^https?/
    },

    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },

    accessories:[{ //!!! Array for more than 1 accessory! 
        type: mongoose.Types.ObjectId, //This is objectId, directly from mongoose
        ref: 'Accessory'
    }],

    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    
});

// cubeSchema.methods //We can add more mathods and validations
// cubeSchema.virtual
// cubeSchema.path('imageUrl').get((v)=>{
//     if (condition) {
        
//     }
// })

module.exports = mongoose.model('Cube', cubeSchema);



// class Cube { //After the Schema is ready, we dont need this class any more.
//     constructor(id, name, description, imageUrl, level){
    //         this.id = id;
    //         this.name = name;
    //         this.description = description;
    //         this.imageUrl = imageUrl;
    //         this.level = level;
    //     }
    
    // };
    // module.exports = Cube;


// This is the first variant, from express workshop
// let productsDb = require('../config/products.json');
// const Model = require('./Model');

// class Cube extends Model {
//     constructor(id, name, description, imageUrl, level){
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.level = level;
//     }
 
// };

// module.exports = Cube;