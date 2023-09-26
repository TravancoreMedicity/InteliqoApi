const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { getTopicByNameId, getEmpNameById, TrainingEmployeeScheduleInsert, TrainingEmployeeScheduleGet, TrainingEmployeeScheduleUpdate } = require('./TrainingEmployeeSchedule.controller');

router.get('/selecttopic/:id', checkToken, getTopicByNameId)
router.get('/selectemp/:id', checkToken, getEmpNameById);
router.post('/insert', checkToken, TrainingEmployeeScheduleInsert);
router.get('/select', checkToken, TrainingEmployeeScheduleGet);
router.patch('/update', checkToken, TrainingEmployeeScheduleUpdate);

module.exports = router;