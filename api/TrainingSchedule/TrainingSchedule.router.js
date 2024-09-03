const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { TrainingNameGet, TrainingScheduleInsert, TrainingScheduleGet, TrainingScheduleUpdate, GetDeptWiseTrainings } = require('./TrainingSchedule.controller');

router.get('/selecttrainingname', checkToken, TrainingNameGet)
router.post('/insert', checkToken, TrainingScheduleInsert)
router.get('/select', checkToken, TrainingScheduleGet)
router.patch('/update', checkToken, TrainingScheduleUpdate)
router.get('/training_names_by_dept/:id', checkToken, GetDeptWiseTrainings);

module.exports = router;