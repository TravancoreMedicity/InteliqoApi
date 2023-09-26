const router = require('express').Router();

const { checkToken } = require("../../auth/token_validation");
const { DepartmentalTrainingScheduleInsert, DepartmentalTrainingScheduleGet, DepartmentalTrainingScheduleUpdate, getTopicByTNameID } = require('./DepartmentalTrainingSchedule.controller');

router.post('/insert', checkToken, DepartmentalTrainingScheduleInsert);
router.get('/select', checkToken, DepartmentalTrainingScheduleGet)
router.patch('/update', checkToken, DepartmentalTrainingScheduleUpdate)
router.get('/select/:id', checkToken, getTopicByTNameID)

module.exports = router;