const express = require('express')
const router = express.Router()
const { registerUserController, logoutUserController, loginUserController } = require('../controllers/authControllers')

router.post('/register', registerUserController)
router.post('/login', loginUserController)
router.post('/logout', logoutUserController)



module.exports = router;