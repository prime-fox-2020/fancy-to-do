const bcrypt = require('bcrypt')

const hashPwd = password => {
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.salt_round))
        const hashed = bcrypt.hashSync(password, salt)
        return hashed
    } catch (err) {
        console.log(err)
    }
}

const checkPwd = (password, hashed) => {
    try {
        return bcrypt.compareSync(password, hashed)
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    hashPwd,
    checkPwd
}