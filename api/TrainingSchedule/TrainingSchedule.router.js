const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingNameGet, TrainingScheduleInsert, TrainingScheduleGet, TrainingScheduleUpdate } = require('./TrainingSchedule.controller');

router.get('/selecttrainingname', checkToken, TrainingNameGet)
router.post('/insert', checkToken, TrainingScheduleInsert)
router.get('/select', checkToken, TrainingScheduleGet)
router.patch('/update', checkToken, TrainingScheduleUpdate)

module.exports = router;