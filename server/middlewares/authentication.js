const jwt = require('jsonwebtoken')
const secret = 'jangandihack'

function authentication (req,res,next){
  let { token } = req.headers

  if(!token){
    res.status(400).json({message: 'Please login first!'})
  }
  try {
    const decoded = jwt.verify(token, secret)
    req.userData = decoded
    next()
  } catch (err) {
    res.status(401).json({message: err.message})
  }

}

module.exports = authentication