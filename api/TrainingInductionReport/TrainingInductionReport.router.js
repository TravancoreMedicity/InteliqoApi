const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductCalenderReport, GetInductionCompletedList, GetInductionPendingList } = require('./TrainingInductionReport.controller');

router.post('/SelectInductCalenderReport', checkToken, GetInductCalenderReport);
router.post('/inductionCompletedList', checkToken, GetInductionCompletedList);
router.post('/inductionPendingList', checkToken, GetInductionPendingList);

module.exports = router;
