const express = require('express');
const router = express.Router();
const { handleReport } = require('../controllers/reportController');

router.post('/report', handleReport);

module.exports = router;