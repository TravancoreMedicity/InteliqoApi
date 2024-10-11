const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductCalenderReport, GetInductionCompletedList, GetinductPendingList, GetInductionPendingList, GetInductionPassedEmpList, GetInductionFailedEmpList, GetinductionGeneralList } = require('./TrainingInductionReport.controller');

router.post('/SelectInductCalenderReport', checkToken, GetInductCalenderReport);
router.post('/inductionCompletedList', checkToken, GetInductionCompletedList);
router.post('/inductionPendingList', checkToken, GetInductionPendingList);
router.post('/inductionPassedEmpList', checkToken, GetInductionPassedEmpList);
router.post('/inductionFailedEmpList', checkToken, GetInductionFailedEmpList);
router.post('/inductionGeneralList', checkToken, GetinductionGeneralList);
router.post('/inductPendingList', checkToken, GetinductPendingList);


module.exports = router;
