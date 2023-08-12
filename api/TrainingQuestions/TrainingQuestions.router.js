const router = require('express').Router();

const { TrainingQuestionGetTopic, TrainingQuestionInsert, TrainingQuestionGet, TrainingQuestionUpdate } = require('./TrainingQuestions.controller');


router.get('/selecttopic', TrainingQuestionGetTopic);
router.post('/insert', TrainingQuestionInsert);
router.get('/select', TrainingQuestionGet);
router.patch('/update', TrainingQuestionUpdate);

module.exports = router;