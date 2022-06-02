const jwt = require('jsonwebtoken');
const { COOKIE_NAME, SECRET } = require('../config/config');

module.exports = function () {
    return (req, res, next) => {

        let token = req.cookies[COOKIE_NAME];

        if (token) {
            jwt.verify(token, SECRET, function (err, decoded) {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                    // res.locals.user = {};
                    // res.locals.isAuthenticated = false;
                } else { 
                    req.user = decoded; 
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            })
            
        }
        
        next();
    };
    }





    // if (token) {                             // това не тръгна, продължаваме с колбек
    //     jwt.verify(token, SECRET)
    //     .then(decoded => {
    //         console.log(decoded);
    //     })
    //     .catch(error => {
    //         //TODO: handle invalid token
    //     })
    // }
