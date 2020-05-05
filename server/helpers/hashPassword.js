require('dotenv').config()
const bcrypt = require('bcryptjs');
const saltRounds = 2;

const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

module.exports = {
    hashPassword
};