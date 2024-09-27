const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductCalenderReport, GetInductionCompletedList, GetInductionPendingList, GetInductionPassedEmpList, GetInductionFailedEmpList } = require('./TrainingInductionReport.controller');

router.post('/SelectInductCalenderReport', checkToken, GetInductCalenderReport);
router.post('/inductionCompletedList', checkToken, GetInductionCompletedList);
router.post('/inductionPendingList', checkToken, GetInductionPendingList);
router.post('/inductionPassedEmpList', checkToken, GetInductionPassedEmpList);
router.post('/inductionFailedEmpList', checkToken, GetInductionFailedEmpList);


module.exports = router;
