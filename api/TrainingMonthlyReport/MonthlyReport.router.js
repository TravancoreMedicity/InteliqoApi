const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetTrainingList, GetscheduledDetails, GetMonthlyReportByMonth, GetDepartmentNames, GetDepartmentalTrainingTopics, GetDepartmentSecNames, GetDepartmentNamesById, GetDepartmentSecNamesById, getDeptTopicsById, getDeptTopicsByDepartId } = require('./MonthlyReport.controller');

router.post('/getmonthlyreport', checkToken, GetMonthlyReportByMonth)
router.post('/trainingList', checkToken, GetTrainingList)
router.post('/scheduledDetails', checkToken, GetscheduledDetails)
//redux agegrid report
router.get('/getDept', checkToken, GetDepartmentNames)
router.post('/dept/ById', checkToken, GetDepartmentNamesById)


router.post('/getDeptSec/ById', checkToken, GetDepartmentSecNamesById)
router.post('/getDeptSec', checkToken, GetDepartmentSecNames)

router.post('/getDeptTopics', checkToken, GetDepartmentalTrainingTopics)
router.post('/getDeptTopics/ById', checkToken, getDeptTopicsById);


router.post('/TrainingTopic/select/:id', checkToken, getDeptTopicsByDepartId);




module.exports = router;

