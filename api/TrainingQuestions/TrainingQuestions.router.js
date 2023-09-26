const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingQuestionGetTopic, TrainingQuestionInsert, TrainingQuestionGet, TrainingQuestionUpdate } = require('./TrainingQuestions.controller');


router.get('/selecttopic', checkToken, TrainingQuestionGetTopic);
router.post('/insert', checkToken, TrainingQuestionInsert);
router.get('/select', checkToken, TrainingQuestionGet);
router.patch('/update', checkToken, TrainingQuestionUpdate);

module.exports = router;