const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

function authentication(req, res, next) {
    const { token } = req.headers;
    console.log('token: ', token);
    try {
        let decoded = verifyToken(token)
        console.log('decoded: ', decoded);
        const { id, email } = decoded;
        User.findByPk(id)
            .then((result) => {
                if (result) {
                    req.userId = id
                    next()
                } else {
                    res.status(401).json({ err: err.message || 'Invalid Email/Password' })
                }
            }).catch((err) => {
                res.status(500).json({ err: err.message || 'Internal error server' })
            });
    } catch (err) {
        res.status(500).json({ err: err.message || 'Internal error server' })
    }

}

module.exports = {
    authentication
};
