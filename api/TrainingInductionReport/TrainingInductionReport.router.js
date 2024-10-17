const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductCalenderReport, GetInductionCompletedList, GetinductPendingList, GetInductionPendingList, GetInductionPassedEmpList, GetInductionFailedEmpList, GetinductionGeneralList, GetinductReTestList, GetTrainerTrainingInductDatas, GetTrainerTrainingDeptDatas, GetInductTrainingTopicWise, GetInductionDeptWiseTrainings, GetInductionAllStaffReports, GetScheduledDeptTrainingList, getTrainingCompletionEmpReports, getDeptPendingEmpReports, GetDeptStaffExamPassedReport, GetDeptStaffExamFailledReport, GetYearWiseDepartmentalTrainingList } = require('./TrainingInductionReport.controller');

router.post('/SelectInductCalenderReport', checkToken, GetInductCalenderReport);
router.post('/inductionCompletedList', checkToken, GetInductionCompletedList);
router.post('/inductionPendingList', checkToken, GetInductionPendingList);
router.post('/inductionPassedEmpList', checkToken, GetInductionPassedEmpList);
router.post('/inductionFailedEmpList', checkToken, GetInductionFailedEmpList);
router.post('/inductionGeneralList', checkToken, GetinductionGeneralList);
router.post('/inductPendingList', checkToken, GetinductPendingList);
router.post('/inductionReTestEmpList', checkToken, GetinductReTestList);
router.get('/TrainerTrainingInductDatas/:id', checkToken, GetTrainerTrainingInductDatas);
router.get('/TrainerTrainingDeptDatas/:id', checkToken, GetTrainerTrainingDeptDatas);
router.post('/inductTrainingTopicWise', checkToken, GetInductTrainingTopicWise);
router.post('/getInductionDeptWise', checkToken, GetInductionDeptWiseTrainings);
router.post('/getInductionAllStaffReport', checkToken, GetInductionAllStaffReports);
router.post('/ScheduledDeptTrainingList', checkToken, GetScheduledDeptTrainingList);
router.post('/getDeptScheduleList', checkToken, getTrainingCompletionEmpReports);
router.post('/getDeptPendingList', checkToken, getDeptPendingEmpReports);
router.post('/GetDeptStaffExamPassedReport', checkToken, GetDeptStaffExamPassedReport);
router.post('/GetDeptStaffExamFailledReport', checkToken, GetDeptStaffExamFailledReport);
router.post('/GetYearWiseDepartmentalTrainingList', checkToken, GetYearWiseDepartmentalTrainingList);

module.exports = router;
