const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.post('/api/authenticate', auth.authenticate);
router.post('/api/addUser', auth.addUser);




module.exports = router;