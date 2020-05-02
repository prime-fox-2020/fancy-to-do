const {verifyToken} =require('../helpers/jwt.js')

const authentication = (respond,request,next)=>{
    const {access_token}  = request.headers
    console.log({access_token})

    if (!access_token) {
        next({
            name: 'Access Token not Found'
        })
    
    }
    try {
        console.log('authenticating...')
        const decode = verifyToken(access_token)
        request.userData = decode
        next()
    } catch (err) {
        console.log(err)
         next({
             name: 'Authentication Failed!'
         })
    }
}

module.exports = authentication
