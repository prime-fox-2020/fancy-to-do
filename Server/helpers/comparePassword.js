const bcrypt = require('bcrypt');

function comparePassword(pass, user) {
  return bcrypt.compareSync(pass, user.password);
}

module.exports = comparePassword;