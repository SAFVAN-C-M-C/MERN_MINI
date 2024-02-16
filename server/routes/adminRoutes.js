const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
const upload = require('../middleware/upload')

router.route('/fetchUsers')
    .get(adminController.fetchUsers)

router.route('/saveUser/:id')
    .post(upload.single('image'),adminController.saveUser)

router.route('/deleteUser/:id')
    .delete(adminController.deleteUser)

router.route('/addUser')
    .post(upload.single('image'),adminController.addUser)

module.exports = router;