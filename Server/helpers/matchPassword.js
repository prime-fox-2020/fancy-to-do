const bcrypt = require('bcrypt')
const matchPassword = (reqPassword, userPassword) => {
    return bcrypt.compareSync(reqPassword, userPassword)
}

module.exports = matchPassword