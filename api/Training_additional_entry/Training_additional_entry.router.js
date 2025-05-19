const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { ScheduleInsert, InsertTrainings } = require('./Training_additional_entry.controller');

router.post('/scheduleInsert', checkToken, ScheduleInsert);
router.post('/insertTrainings', checkToken, InsertTrainings);

module.exports = router;