const jwt = require('jsonwebtoken')
const secretKey = 'secretKey'

const authentication = (req, res, next) => {
  const {access_token} = req.headers

  if(!access_token) {
    res.status(400).json({message: 'Please Login First'})
  }

  try{
    const decoded = jwt.verify(access_token, secretKey)
    req.userData = decoded
    next()
  } catch(err) {
    res.status(401).json({message: err.message})
  }
}

module.exports = authentication