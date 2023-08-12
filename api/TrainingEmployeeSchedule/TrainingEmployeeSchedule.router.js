const router = require('express').Router();

const { getTopicByNameId, getEmpNameById, TrainingEmployeeScheduleInsert } = require('./TrainingEmployeeSchedule.controller');


router.get('/selecttopic/:id', getTopicByNameId)
router.get('/selectemp/:id', getEmpNameById);
router.post('/insert', TrainingEmployeeScheduleInsert)

module.exports = router;