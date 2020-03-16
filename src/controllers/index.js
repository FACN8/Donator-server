const express = require('express');
const router = express.Router();
const auth = require('./auth');
const {getOrgInfo} = require('./organizations')
const middleware = require('../middlewares')


router.post('/api/authenticate', auth.authenticate);
router.post('/api/addUser', auth.addUser);
router.get('/api/orgInfo',middleware.authCheck, getOrgInfo);





module.exports = router;