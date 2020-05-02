const router = require('express').Router()
const UserController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.json({
        msg : `this is user page`
    })
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSignIn', UserController.googleSignIn)


module.exports = router