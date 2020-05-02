const jwt = require('jsonwebtoken');
const secretKey = 'todos-app';

const authentication = (req, res, next) => {
    const access_token = req.headers.access_token;
    if (!access_token) {
        res.status(404).json({ errorCode: 'ACCESS_DENIED', message: 'Invalid token' });
    }
    try {
        const decoded = jwt.verify(access_token, secretKey);
        req.userData = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ errorCode: 'AUTHENTICATION_FAILED', message: err.message || 'User not authenticated' });
    }
}

module.exports = {
    authentication
};