const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingAfterJoiningGet, ScheduleUpdate, TrainingNewJoineeInsert, ScheduleInsert, GetTopic, ScheduleDateUpdate, GetTrainers, JoineeDetailsInsert, JoineeDetailsUpdate, ScheduleDetailsGet, GetScheduleDetails, DepartmentalScheduleInsert, DepartmentalScheduleGet } = require('./TrainingAfterJoining.controller');


router.get('/select', checkToken, TrainingAfterJoiningGet);
router.post('/insertnewjoinee', checkToken, TrainingNewJoineeInsert);
router.post('/JoineeDetailsInsert', checkToken, JoineeDetailsInsert);
router.patch('/JoineeDetailsUpdate', checkToken, JoineeDetailsUpdate);
router.get('/selectSchedule', checkToken, ScheduleDetailsGet);
router.patch('/ScheduleUpdate', checkToken, ScheduleUpdate);
router.get('/selecttopic', checkToken, GetTopic);
router.get('/SelectTrainer', checkToken, GetTrainers);
router.post('/scheduleInsert', checkToken, ScheduleInsert);
router.get('/selectScheduleDetails', checkToken, GetScheduleDetails);
router.post('/InsertDepartmentalSchedule', checkToken, DepartmentalScheduleInsert);
router.get('/selectdepartmentalSchedule', checkToken, DepartmentalScheduleGet);
router.patch('/ScheduledateUpdate', checkToken, ScheduleDateUpdate);

module.exports = router;

