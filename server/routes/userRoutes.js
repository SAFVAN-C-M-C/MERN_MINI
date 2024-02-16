const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const upload = require('../middleware/upload')

router.route('/user/signup')
    .post(upload.single('image'),userController.postSignup);
router.route('/user/login')
    .post(userController.postLogin)

router.route('/user/userDetails/:id')
    .get(userController.getDetails)
router.route('/user/update/:id')
    .post(upload.single('image'),userController.update)
router.route('/user/authentication')
    .get(userController.getAuth)
router.route('/user/logout')
    .get(userController.logout)

module.exports = router;