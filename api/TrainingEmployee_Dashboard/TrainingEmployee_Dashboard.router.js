const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetBelowAvgEmpList, InsertRetestEmp, GetEmpRetestTopics, GetRetestQuestions, InsertRetestDetails } = require('./TrainingEmployee_Dashboard.controller');

router.post('/retestEmp', InsertRetestEmp)
router.get('/belowAvgEmp', checkToken, GetBelowAvgEmpList)
router.get('/retestEmptopics/:id', checkToken, GetEmpRetestTopics)
router.post('/resetQuestions', GetRetestQuestions)
router.post('/insertRetest', InsertRetestDetails)

module.exports = router;


