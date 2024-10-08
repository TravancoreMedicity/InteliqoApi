const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductionTestTopics, GetLogEmpDetails, GetInductlogEmpDatas, InsertPretest, GetTestEmpdetails, UpdateOnlineMode, UpdateOfflineMode, GetPosttestQRdetails, InsertPostTest, GetEmpDataForFeedback, GetEmpDetailsForFeedbackWithoutTest } = require('./InductionTest.controller');

router.get('/PrepostTopics', checkToken, GetInductionTestTopics)
router.post('/inductlogEmpDetails', GetLogEmpDetails)
router.post('/inductlogEmpDatas', GetInductlogEmpDatas)
router.get('/TestEmpDetails/:id', GetTestEmpdetails)
router.post('/pretest', InsertPretest)
router.patch('/update_online', UpdateOnlineMode)
router.patch('/update_offline', UpdateOfflineMode)
router.get('/InductpostTestEmpDetails/:id', GetPosttestQRdetails)
router.post('/postTest', InsertPostTest)
router.post('/GetEmpDetails_for_feedback', GetEmpDataForFeedback)
router.post('/GetEmpDetails_for_feedback_withoutTest', GetEmpDetailsForFeedbackWithoutTest)

module.exports = router;

