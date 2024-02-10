const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingTopicInsert, TrainingTypeWiseTopic, TrainingTopicGet, TrainingTopicUpdate } = require('./TrainingTopic.controller');

router.post('/insert', checkToken, TrainingTopicInsert);
router.get('/select', checkToken, TrainingTopicGet);
router.patch('/update', checkToken, TrainingTopicUpdate);
router.post('/selectbyType/:id', checkToken, TrainingTypeWiseTopic);

module.exports = router;