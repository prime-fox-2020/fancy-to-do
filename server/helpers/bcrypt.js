const bcrypt = require('bcryptjs');

function generatePassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash    
}

module.exports = {
    generatePassword
};
