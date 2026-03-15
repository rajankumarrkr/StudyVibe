const express = require('express');
const { getDailyStats, getSubjectStats } = require('../controllers/statsController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/daily', auth, getDailyStats);
router.get('/subject', auth, getSubjectStats);

module.exports = router;
