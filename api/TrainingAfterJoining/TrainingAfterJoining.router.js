const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingAfterJoiningGet, ScheduleUpdate, InsertTrainingMaster, TrainingNewJoineeInsert, ScheduleInsert, GetTopic, ScheduleDateUpdate, GetTrainers, JoineeDetailsInsert, JoineeDetailsUpdate, ScheduleDetailsGet, GetScheduleDetails, DepartmentalScheduleInsert, DepartmentalScheduleGet, getDeptTopic, getEmpNameBydepID, InsertEmpDetails, GetDeptEmpNameDetails, UpdateTrainers, getTrainerByTopic, getScheduleDatas } = require('./TrainingAfterJoining.controller');


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
router.post('/selectdepartmentalSchedule', checkToken, DepartmentalScheduleGet);
router.patch('/ScheduledateUpdate', checkToken, ScheduleDateUpdate);
router.get('/deptTrainingtopic/:id', checkToken, getDeptTopic)
router.get('/select/:id', checkToken, getEmpNameBydepID)
router.post('/insertEmployees', checkToken, InsertEmpDetails)
router.get('/selectemp/:id', checkToken, GetDeptEmpNameDetails)
//insert training Master
router.post('/insertTrainingMaster', checkToken, InsertTrainingMaster)
router.patch('/UpdateTrainers', checkToken, UpdateTrainers);
router.get('/getTrainerByTopic/:id', checkToken, getTrainerByTopic)
router.post('/scheduledatas', checkToken, getScheduleDatas)

module.exports = router;


