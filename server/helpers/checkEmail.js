const axios = require('axios')

function checkEmail(email){
    let options = {
        url: `https://apilayer.net/api/check?access_key=${process.env.MAILBOXLAYER_KEY}&email=${email}`,
        method: 'get'
    }
    return axios(options)
}

module.exports = checkEmail