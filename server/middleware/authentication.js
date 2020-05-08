const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

function authentication(req, res, next) {
    const { akses_token } = req.headers;
    console.log('akses_token: auth ', akses_token);
    try {
        let decoded = verifyToken(akses_token)
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
