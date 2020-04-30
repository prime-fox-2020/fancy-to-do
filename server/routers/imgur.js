const router=require('express').Router()
const imgurController=require('../controller/imgurController')
const authentication=require('../middleware/authentication')

router.use(authentication)
router.post('/',  imgurController.getToken)
router.get('/image', imgurController.getImage)
router.post('/upload', imgurController.uploadImage)

module.exports=router