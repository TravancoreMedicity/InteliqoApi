const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductionTestTopics, GetLogEmpDetails, InsertPretest, GetTestEmpdetails, UpdateOnlineMode, UpdateOfflineMode, GetPosttestQRdetails, InsertPostTest } = require('./InductionTest.controller');

router.get('/PrepostTopics', checkToken, GetInductionTestTopics)
router.post('/inductlogEmpDetails', GetLogEmpDetails)
router.get('/TestEmpDetails/:id', GetTestEmpdetails)
router.post('/pretest', InsertPretest)
router.patch('/update_online', UpdateOnlineMode)
router.patch('/update_offline', UpdateOfflineMode)
router.get('/InductpostTestEmpDetails/:id', GetPosttestQRdetails)
router.post('/postTest', InsertPostTest)

module.exports = router;

