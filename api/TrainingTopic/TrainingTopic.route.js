const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingTopicInsert, TrainingTopicGet, TrainingTopicUpdate } = require('./TrainingTopic.controller');

router.post('/insert', checkToken, TrainingTopicInsert);
router.get('/select', checkToken, TrainingTopicGet);
router.patch('/update', checkToken, TrainingTopicUpdate);

module.exports = router;