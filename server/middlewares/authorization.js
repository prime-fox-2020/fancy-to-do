const { Todo } = require('../models')
const { User } = require('../models')

const authorization = (req, res, next) => {
    const userId = req.userData.id

    User.findByPk(userId)
    .then((user) => {
      console.log('user authoriza', user)
      if (!user) {
        res.status(403).json({ message: "forbidden access" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message || "internal eror server" });
    });
}
module.exports = {
    authorization
}