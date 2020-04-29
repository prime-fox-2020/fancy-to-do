const jwt = require('jsonwebtoken');
const secretKey = 'biasa saja';

const authentication = (req, res, next) => {
    const {access_token} = req.headers;
    
    if(!access_token) res.status(404).json({errMessage: 'token not found'});

    try {
        const decoded = jwt.verify(access_token, secretKey);
        req.userData = decoded;
        next();    
    } catch(err) {
        res.status(401).json({errMessage: err.message || 'User Unauthenticate'});
    }
}

module.exports = authentication;