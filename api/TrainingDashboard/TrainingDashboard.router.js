const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { GetTndInductMonthlyTrainings, GetTndDeptMonthlyTrainings, GetTndInductMonthlyAll, GetTndDeptMonthlyAll, GetPieChartData, GetBarChartData, GetInductCompleteList, GetInductPendingList, GetInductNextMnthList, DeptCompleteList, GetDeptPendingList, DeptNextMnthList, GetInductRetestList, DeptRetestList, GetInductTotalSchedule, DeptTotalSchedule, GetInductApprovalCount, GetDeptApprvlCount, GetHodInchargeDeptTrainings, GetHODInchargeInductAprvlcount, GetHODInchargeDeptAprvlcount, GetEmpDeptTrainings, GetHODDeptMonthlyTrainings, GetHODDeptMonthlyAll, GetEmpInductTraining, GetNotAttendData, GetHodInchargeDeptOverview, GetEmpBarChartData, GetEmplinechartData } = require('./TrainingDashboard.controller');

router.post('/Inductmonthlytraining', checkToken, GetTndInductMonthlyTrainings)
router.post('/deptmonthlytraining', checkToken, GetTndDeptMonthlyTrainings)
router.post('/HodInchargedeptmonthlytraining', checkToken, GetHODDeptMonthlyTrainings)
router.post('/Inductmonthlyall', checkToken, GetTndInductMonthlyAll)
router.post('/deptmonthlyall', checkToken, GetTndDeptMonthlyAll)
router.post('/HodInchargedeptmonthlyall', checkToken, GetHODDeptMonthlyAll)
router.post('/linechart', checkToken, GetPieChartData)
router.post('/Emplinechart', checkToken, GetEmplinechartData)
router.post('/notAttend', checkToken, GetNotAttendData)
router.post('/BarChart', checkToken, GetBarChartData)
router.post('/EmpBarChart', checkToken, GetEmpBarChartData)
router.post('/InductComplete', checkToken, GetInductCompleteList)
router.post('/InductPending', checkToken, GetInductPendingList)
router.post('/InductNextMnth', checkToken, GetInductNextMnthList)
router.post('/DeptComplete', checkToken, DeptCompleteList)
router.post('/DeptPending', checkToken, GetDeptPendingList)
router.post('/DeptNextMnth', checkToken, DeptNextMnthList)
router.post('/InductRetest', checkToken, GetInductRetestList)
router.post('/DeptRetest', checkToken, DeptRetestList)
router.post('/InductTotal', checkToken, GetInductTotalSchedule)
router.post('/DeptTotal', checkToken, DeptTotalSchedule)
router.post('/InductAprvlcount', checkToken, GetInductApprovalCount)
router.post('/DeptAprvlcount', checkToken, GetDeptApprvlCount)
router.post('/HodInchargeDeptOverview', checkToken, GetHodInchargeDeptOverview)
router.post('/HodInchargeDeptTrainings', checkToken, GetHodInchargeDeptTrainings)
router.post('/commonInductAprvlcount', checkToken, GetHODInchargeInductAprvlcount)
router.post('/commonDeptAprvlcount', checkToken, GetHODInchargeDeptAprvlcount)
router.post('/EmpDeptTrainings', checkToken, GetEmpDeptTrainings)
router.post('/EmpInductTraining', checkToken, GetEmpInductTraining)

module.exports = router;

