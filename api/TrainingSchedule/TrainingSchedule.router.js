const router = require('express').Router();

const { TrainingNameGet, TrainingScheduleInsert, TrainingScheduleGet, TrainingScheduleUpdate } = require('./TrainingSchedule.controller');

router.get('/selecttrainingname', TrainingNameGet)
router.post('/insert', TrainingScheduleInsert)
router.get('/select', TrainingScheduleGet)
router.patch('/update', TrainingScheduleUpdate)

module.exports = router;