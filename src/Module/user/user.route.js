const express = require('express');
const { createUser, getAllUser, countAllUser, userSearchByName, filterUser, deleteUser,   } = require('./user.controller');
const router = express.Router()


router.post('/createUser', createUser)
router.get('/getAllUser', getAllUser)
router.delete('/deleteUser/:id', deleteUser)
router.get('/getUserCount', countAllUser)
router.get('/search/:name', userSearchByName)
router.get('/filter/:domain', filterUser)


module.exports = router