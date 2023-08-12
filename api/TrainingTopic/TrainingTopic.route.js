const router = require('express').Router();

const { TrainingTopicInsert, TrainingTopicGet, TrainingTopicUpdate } = require('./TrainingTopic.controller');

router.post('/insert', TrainingTopicInsert);
router.get('/select', TrainingTopicGet);
router.patch('/update', TrainingTopicUpdate);

module.exports = router;