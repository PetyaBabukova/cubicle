const config = {
    development: {
        PORT: process.env.PORT || 5000,
    },

    production: {
        PORT: process.env.PORT || 80,
    }
};

module.exports = config[process.env.NODE_ENV.trim()]