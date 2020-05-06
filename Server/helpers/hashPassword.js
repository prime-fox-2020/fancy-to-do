const bcrypt = require('bcrypt')
const saltRounds = 4

const hash = (password) => {
    let hashed = bcrypt.hashSync(password, saltRounds)
    return hashed
}

module.exports = hash