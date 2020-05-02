const { User } = require('../models')
const jwt = require('jsonwebtoken')
const secretKey = "kunci rahasia"

const authentication = (req, res, next) => {
    try {
      const { access_token } = req.headers;
      console.log('masuk', access_token)
  
      if (!access_token) {
        res.status(404).json({ message: "token not found" });
      } else {
        const decoded = jwt.verify(access_token, secretKey);
        console.log('decoded', decoded)
  
        User.findByPk(decoded.id).then((data) => {
          if (data) {
            req.userData = decoded;
            next()
          } else {
            res.status(404).json({ message: "user not found" });
          }
        })
      }
    } catch (err) {
      res.status(401).json({ message: err.message || "User not authenticate" });
    }
  }
  
module.exports = {
    authentication
}