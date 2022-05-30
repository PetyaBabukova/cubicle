const bcript = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config')

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

    // generate token
}

module.exports = {
    register,
    login
}