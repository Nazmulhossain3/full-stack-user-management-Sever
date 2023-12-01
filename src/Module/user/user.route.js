const express = require('express');
const { createUser, getAllUser } = require('./user.controller');
const router = express.Router()

router.post('/createUser', createUser)
router.get('/getAllUser', getAllUser)


module.exports = router