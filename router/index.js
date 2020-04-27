const router = require('express').Router()

router.get('/', (req,res) => {
    res.send('hi ini router')
    // res.status(200).json({
    //     msg: "fancy-todo"
    // })
})

module.exports = router