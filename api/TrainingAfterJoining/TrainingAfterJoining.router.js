const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingAfterJoiningGet, ScheduleUpdate, TrainingNewJoineeInsert, ScheduleInsert, GetTopic, GetTrainers, JoineeDetailsGet, JoineeDetailsInsert, JoineeDetailsUpdate, ScheduleDetailsGet, GetScheduleDetails } = require('./TrainingAfterJoining.controller');


router.get('/select', checkToken, TrainingAfterJoiningGet);
router.post('/insertnewjoinee', checkToken, TrainingNewJoineeInsert);
// router.get('/selectnewjoinee', checkToken, JoineeDetailsGet);
router.post('/JoineeDetailsInsert', checkToken, JoineeDetailsInsert);
router.patch('/JoineeDetailsUpdate', checkToken, JoineeDetailsUpdate);
router.get('/selectSchedule', checkToken, ScheduleDetailsGet);
router.patch('/ScheduleUpdate', checkToken, ScheduleUpdate);
router.get('/selecttopic', checkToken, GetTopic);
router.get('/SelectTrainer', checkToken, GetTrainers);
router.post('/scheduleInsert', checkToken, ScheduleInsert);
router.get('/selectScheduleDetails', checkToken, GetScheduleDetails);

module.exports = router;

