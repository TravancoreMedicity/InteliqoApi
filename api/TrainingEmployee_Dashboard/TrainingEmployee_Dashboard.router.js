const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetBelowAvgEmpList, InsertRetestEmp, GetEmpRetestTopics, GetRetestQuestions, InsertRetestDetails, GetRetestEmpDetails, GetInductionEmpRetestTopics, GetinductRetestQuestions, InsertInductRetestDetails, GetRetestQREmpDetails } = require('./TrainingEmployee_Dashboard.controller');

router.post('/retestEmp', InsertRetestEmp)
router.get('/retestEmptopics/:id', checkToken, GetEmpRetestTopics)
router.post('/resetQuestions', GetRetestQuestions)
router.post('/insertRetest', InsertRetestDetails)
router.post('/getDetails', GetRetestEmpDetails)
//induction
router.get('/inductionretestEmptopics/:id', checkToken, GetInductionEmpRetestTopics)
router.post('/inductresetQuestions', GetinductRetestQuestions)
router.post('/inductinsertRetest', InsertInductRetestDetails)
router.post('/employeedeatils', GetRetestQREmpDetails)
router.post('/belowAvgEmp', GetBelowAvgEmpList)
module.exports = router;


