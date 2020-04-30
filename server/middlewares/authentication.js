const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const authentication = (req, res, next) => {
  const {access_token} = req.headers

  if(!access_token) {
    next({name: 'PLEASE_LOGIN_FIRST'})
  }

  try{
    const decoded = jwt.verify(access_token, secretKey)
    req.userData = decoded
    next()
  } catch(err) {
    next(err)
  }
}

module.exports = authentication