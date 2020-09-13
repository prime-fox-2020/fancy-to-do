const router=require('express').Router()
const imgurController=require('../controller/imgurController')
const authentication=require('../middleware/authentication')

router.use(authentication)
router.post('/',  imgurController.getToken)
router.get('/image', imgurController.getImage)

module.exports=router