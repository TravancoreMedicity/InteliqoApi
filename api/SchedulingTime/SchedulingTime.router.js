const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");

const { SchedulingTimeInsert, SchedulingTimeGet, SchedulingTimeUpdate, SchedulingTimeDelete } = require('./SchedulingTime.controller');

router.post('/insert', SchedulingTimeInsert);
router.get('/select', SchedulingTimeGet);
router.patch('/update', SchedulingTimeUpdate)
router.patch('/delete', checkToken, SchedulingTimeDelete)


module.exports = router;