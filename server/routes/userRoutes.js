const { sample } = require('../controller/userController')

const router=require('express').Router()



router.get('/',sample)

module.exports=router