const jwt = require('jsonwebtoken')
const secret = process.env.secret

function authentication (req,res,next){
  let { token } = req.headers

  if(!token){
    next({name: 'LOGIN_FIRST'})
  }
  try {
    const decoded = jwt.verify(token, secret)
    req.userData = decoded
    next()
  } catch (err) {
    next(err)
  }

}

module.exports = authentication