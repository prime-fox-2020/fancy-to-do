require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

const authentication = (req, res, next) => {
    const { access_token } = req.headers;

    if (!access_token) {
        next({ name: 'INVALID_TOKEN'})
    }
    try {
        const decoded = jwt.verify(access_token, secretKey);
        req.userData = decoded;
        next();
    }
    catch (err) {
        next(err, { name: 'AUTHENTICATION_FAILED'})
    }
}

module.exports = {
    authentication
};