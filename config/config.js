const config = {
    development: {
        PORT: process.env.PORT || 5000,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle',
        SALT_ROUNDS: 10
    },

    production: {
        PORT: process.env.PORT || 80,
        DB_CONNECTION: 'mongodb+srv://PetyaBabukova:PetyaGoogleFan5!@cubicles.vkqxg.mongodb.net/test',
        SALT_ROUNDS: 10
    }
};

module.exports = config[process.env.NODE_ENV.trim()]