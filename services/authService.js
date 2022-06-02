const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, SECRET } = require('../config/config');


const User = require('../models/User');


const register = async ({ username, password }) => {
    // TODO: Check if username exist
    //hash password - read in mongoose documentation - (API - Schema), read bycript docs.
    let salt = await bcript.genSalt(SALT_ROUNDS);
    let hash = await bcript.hash(password, salt);

    const user = new User({ username, password: hash });
    return user.save();

};

const login = async ({ username, password }) => {
    // get user from db
    let user = await User.findOne({username});
if (!user) {
    throw {message: 'User not found'} //тук е хубаво да върнем някаква по обща информация, не толкова конкретна, че няма юзер
}

    //compare password hash
    let isMatch = await bcript.compare(password, user.password);
    if (!isMatch) throw {message: 'Password does not match'}

    // generate token
    let token = jwt.sign({ _id: user._id, roles: ['admin'] }, SECRET); //в токена може да се сложи още информация за юзера - да не е нито много, нито малко !!! пропъртито user_id трябва да е _id. От това ми излезнаха сума ти грешки, когато се опитвах да закача криейтъра. В лекцията - 3 ч. Виж productService (create), productController (post/create)
    return token;
}

module.exports = {
    register,
    login
}