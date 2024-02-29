const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetTrainingProcess, AttendanceMarking, GetDepartmentalTrainings, EmpVerification, InsertpostTest, GetTopicAssignToEmp, GetQuestionDetails, UpdateQuestionCount, GetDataBasedOnCount, InsertPretest, UpdateTrainingDate,
    GetTrainingCompletedList, GetTodaysTrainingList, GetAttendanceList, GetTrainingEmpDetailsAll, GetTrainingEmp, AllotToPostTest, GetpreTestEmpListAll, GetpostTestEmpListAll, UpdateOnlineMode, UpdateOfflineMode } = require('./TrainingProcess.controller');

router.get('/select', checkToken, GetTrainingProcess)
router.patch('/attendance', checkToken, AttendanceMarking)
router.get('/selectdepartmentaltrainings', checkToken, GetDepartmentalTrainings)
router.get('/empTopics/:id', checkToken, GetTopicAssignToEmp)
// router.get('/selectQuest/list/:id', checkToken, GetQuestionDetails)
router.post('/selectQuest/list', GetQuestionDetails)
router.patch('/questionCount', checkToken, UpdateQuestionCount)
router.post('/ScheduleBasedonCount', checkToken, GetDataBasedOnCount)
router.post('/pretest', InsertPretest)
router.post('/postTest', InsertpostTest)
router.patch('/resheduledate', checkToken, UpdateTrainingDate)
//new 
router.get('/trainingcompleted/:id', checkToken, GetTrainingCompletedList)
router.get('/todaystrainings/:id', checkToken, GetTodaysTrainingList)
router.get('/attendancedetails/:id', checkToken, GetAttendanceList)
router.get('/showEmpDetails/:id', checkToken, GetTrainingEmpDetailsAll)
router.get('/trainingEmployees/:id', checkToken, GetTrainingEmp)
router.get('/allotPostTest', AllotToPostTest)
//ORCODE
router.patch('/empverificationQR', EmpVerification)
router.get('/postTestEmpAll', GetpostTestEmpListAll)
router.get('/preTestEmpAll', GetpreTestEmpListAll)

router.patch('/update_online', UpdateOnlineMode)
router.patch('/update_offline', UpdateOfflineMode)


module.exports = router;


