const router = require('express').Router()

router.get('/', (req,res)=>{
  res.status(200).json({
    msg: "Fancy Todo"
  })
})



module.exports = router