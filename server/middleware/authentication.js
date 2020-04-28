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
                    next(err)
                }
            }).catch((err) => {
                next(err)
            });
        } catch (err) {
            next(err)
    }

}

module.exports = {
    authentication
};
