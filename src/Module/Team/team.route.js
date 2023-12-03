const express = require('express');
const { createTeam, getTeam } = require('./team.controller');
const router = express.Router()

router.post('/selectedTeam/:id', createTeam)
router.get('/getTeam', getTeam)




module.exports = router