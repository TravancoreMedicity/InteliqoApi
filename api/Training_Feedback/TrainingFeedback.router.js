const router = require('express').Router();
const { InsertInductFeedback, InsertInductFeedbackWithoutTest } = require('./TrainingFeedback.controller');

router.post('/inductfeedback', InsertInductFeedback)
router.post('/inductfeedbackWithoutTest', InsertInductFeedbackWithoutTest)
module.exports = router;