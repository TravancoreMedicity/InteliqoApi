const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetTrainingProcess, AttendanceMarking, GetDepartmentalTrainings, EmpVerification, InsertpostTest, GetTopicAssignToEmp, GetQuestionDetails, UpdateQuestionCount, GetDataBasedOnCount, InsertPretest, UpdateTrainingDate,
    GetTrainingCompletedList, GetTodaysTrainingList, GetAttendanceList, GetTrainingEmpDetailsAll, GetTrainingEmp, AllotToPostTest, GetpreTestEmpListAll, GetpostTestEmpListAll, UpdateOnlineMode, UpdateOfflineMode, GetAllTodaysDeptTrainings, GetAllDeptCompletedTrainings, GetAllDeptEmpPendings, GetAllDeptBelowAvgEmpList } = require('./TrainingProcess.controller');

router.get('/select', checkToken, GetTrainingProcess)
router.patch('/attendance', checkToken, AttendanceMarking)
router.get('/selectdepartmentaltrainings', checkToken, GetDepartmentalTrainings)
router.get('/empTopics/:id', checkToken, GetTopicAssignToEmp)
router.post('/selectQuest/list', GetQuestionDetails)
router.patch('/questionCount', checkToken, UpdateQuestionCount)
router.post('/ScheduleBasedonCount', checkToken, GetDataBasedOnCount)
router.post('/pretest', InsertPretest)
router.post('/postTest', InsertpostTest)
router.patch('/resheduledate', checkToken, UpdateTrainingDate)
//new 
router.get('/attendancedetails/:id', checkToken, GetAttendanceList)
router.get('/allotPostTest', AllotToPostTest)
//ORCODE
router.patch('/empverificationQR', EmpVerification)
router.get('/postTestEmpAll', GetpostTestEmpListAll)
router.get('/preTestEmpAll', GetpreTestEmpListAll)

router.patch('/update_online', UpdateOnlineMode)
router.patch('/update_offline', UpdateOfflineMode)

//T and D Departmental Training Process
router.get('/getAllDeptTodaysTrainings', checkToken, GetAllTodaysDeptTrainings)
router.get('/GetAllDeptCompletedTrainings', checkToken, GetAllDeptCompletedTrainings)
router.get('/getAllDeptEmpPendings', checkToken, GetAllDeptEmpPendings)
router.get('/getAllDeptBelowAvgEmpList', checkToken, GetAllDeptBelowAvgEmpList)



router.post('/trainingcompleted', checkToken, GetTrainingCompletedList)
router.post('/todaystrainings', checkToken, GetTodaysTrainingList)
router.post('/trainingEmployees', checkToken, GetTrainingEmp)
router.post('/showEmpDetails', checkToken, GetTrainingEmpDetailsAll)



module.exports = router;


