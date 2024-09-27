const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingTopicInsert, TrainingTypeWiseTopic, TrainingTopicGet, TrainingTopicUpdate, TrainingTopicByTypeGet, GetDeptWiseTopic, GetInductTopics } = require('./TrainingTopic.controller');

router.post('/insert', checkToken, TrainingTopicInsert);
router.get('/select', checkToken, TrainingTopicGet);
router.patch('/update', checkToken, TrainingTopicUpdate);
router.post('/selectbyType/:id', checkToken, TrainingTypeWiseTopic);
router.get('/SelectTopicByType/:id', checkToken, TrainingTopicByTypeGet);
router.get('/topic_by_dept/:id', checkToken, GetDeptWiseTopic);
router.get('/InductTopicselect', checkToken, GetInductTopics);

module.exports = router;


