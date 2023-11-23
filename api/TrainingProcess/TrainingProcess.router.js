const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetTrainingProcess, AttendanceMarking, GetDepartmentalTrainings, GetTopicAssignToEmp, GetQuestionDetails, UpdateQuestionCount, GetDataBasedOnCount, InsertPretest } = require('./TrainingProcess.controller');

router.get('/select', checkToken, GetTrainingProcess)
router.patch('/attendance', checkToken, AttendanceMarking)
router.get('/selectdepartmentaltrainings', checkToken, GetDepartmentalTrainings)
router.get('/empTopics/:id', checkToken, GetTopicAssignToEmp)
router.get('/selectQuest/list/:id', checkToken, GetQuestionDetails)
router.patch('/questionCount', checkToken, UpdateQuestionCount)
router.post('/ScheduleBasedonCount', checkToken, GetDataBasedOnCount)
router.post('/pretest', checkToken, InsertPretest)

module.exports = router;
