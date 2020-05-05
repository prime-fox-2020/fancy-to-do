const jwt = require('jsonwebtoken')
const { giveSecretKey } = require('../helper/jwt')

const authentication = (req, res, next) => {
    //verify access_token
    let {access_token} = req.headers
    if(!access_token){
        res.status(404).json({message: "Token not found"})
    }
    try {
        const decoded = jwt.verify(access_token, giveSecretKey());
        // console.log(decoded)
        req.userDataValid = decoded
        next()
      } catch(err) {
        // err
        res.status(404).json({ message: err.message || "Not Authenticated" })
      }
}

module.exports = {
    authentication
}