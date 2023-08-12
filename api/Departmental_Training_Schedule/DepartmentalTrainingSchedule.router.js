const router = require('express').Router();

const { DepartmentalTrainingScheduleInsert, DepartmentalTrainingScheduleGet, DepartmentalTrainingScheduleUpdate, getTopicByTNameID } = require('./DepartmentalTrainingSchedule.controller');

router.post('/insert', DepartmentalTrainingScheduleInsert);
router.get('/select', DepartmentalTrainingScheduleGet)
router.patch('/update', DepartmentalTrainingScheduleUpdate)
router.get('/select/:id', getTopicByTNameID)

module.exports = router;