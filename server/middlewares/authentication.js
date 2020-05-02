require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

const authentication = (req, res, next) => {
    const {access_token} = req.headers;
    
    if(!access_token) next({name: 'TOKEN_NOT_FOUND'});

    try {
        const decoded = jwt.verify(access_token, secretKey);
        req.userData = decoded;
        next();    
    } catch(err) {
        err.message ? next(err) : next({name: 'AUTHENTICATION_ERROR'})
    }
}

module.exports = authentication;