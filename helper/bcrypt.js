const bcrypt = require('bcrypt')
const saltRounds = 5

let generatePassword = (value) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(value, salt)
    return hash
}

let comparePassword = (value, hash) => {
    return bcrypt.compareSync(value, hash)
}

module.exports = {
    generatePassword,
    comparePassword
}