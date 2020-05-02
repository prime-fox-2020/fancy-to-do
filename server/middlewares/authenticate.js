const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req)
    const access_token  = req.query.access_token || req.body.access_token;
    
    if(!access_token){
        res.status(404).json({ message: 'Invalid token!'});
    } else {
        try{
            const decoded = jwt.verify(access_token, 'Hektif');
            req.user = decoded;
            next();
        }
        catch(err){
            res.status(401).json({ message: err.message || 'User not Authenticate!'})
        }
    }
};