const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetDatewiseEmps, ScheduleInductionTrainings, InsertInductionEmps } = require('./TrainingInduction.controller');

router.post('/getEmps', checkToken, GetDatewiseEmps)
router.post('/ScheduleInduction', checkToken, ScheduleInductionTrainings)
router.post('/addInductnEmps', checkToken, InsertInductionEmps)

module.exports = router;

