const { verifyToken } = require('../helpers/jwt')

const authentication = (req, res, next) => {
  const {access_token} = req.headers

  if(!access_token) {
    next({name: 'PLEASE_LOGIN_FIRST'})
  }

  try{
    const decoded = verifyToken(access_token)
    req.userData = decoded
    // cek user dalam db
    next()
  } catch(err) {
    next(err)
  }
}

module.exports = authentication