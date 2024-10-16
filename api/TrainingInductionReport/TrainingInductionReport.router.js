const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetInductCalenderReport, GetInductionCompletedList, GetinductPendingList, GetInductionPendingList, GetInductionPassedEmpList, GetInductionFailedEmpList, GetinductionGeneralList, GetinductReTestList, GetTrainerTrainingInductDatas, GetTrainerTrainingDeptDatas, GetInductTrainingTopicWise, GetInductionDeptWiseTrainings, GetInductionAllStaffReports } = require('./TrainingInductionReport.controller');

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

module.exports = router;
