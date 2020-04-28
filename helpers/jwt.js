const jwt = require('jsonwebtoken');

generateToken = (user) => {
    return access_token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.KEY);
}

module.exports = generateToken;