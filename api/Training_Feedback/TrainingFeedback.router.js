const router = require('express').Router();
const { InsertInductFeedback } = require('./TrainingFeedback.controller');

router.post('/inductfeedback', InsertInductFeedback)

module.exports = router;