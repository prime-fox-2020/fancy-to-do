const bcrypt = require('bcrypt');

function generateHashedPassword (plainPassword) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(plainPassword, salt)
    return hashedPassword
}

function checkPassword (plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
    generateHashedPassword,
    checkPassword
}