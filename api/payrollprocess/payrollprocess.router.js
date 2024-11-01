
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { removeListener } = require("../../config/database");
const { empDeptdata, empDeptSecdata, empNameBasedata, getFixedByEmid, getEarningByEmid, getTotalFineByEmid, getTotalFixedByEmid,
    getTotalEarningsByEmid, getTotalDeductionByEmid, getDeductionByEmid, getLopByEmid, getTotalGrosssalaryById, GetPfStatus,
    getPFcalcalculatingamt, GetEsiStatus, getESIcalculatingamt, createAttendanceManual, getPaySlipTableData, getEmpEarningData,
    getEmpFixedWageData, getEmpDeductionData, getAllEarnData, createPayrollpayslip, createPayrollpayslipDetl, checkAttendanceProcess,
    getPunchdata, getattendancemark, getEmpNoDeptWise, getPunchmastData, DutyPlanLock, dutyPlanUnLock, getPaySlipData,
    getIndvidualPayslipDetl, checkPayslipDataExist, deptWisePaySlipData, empWisePaySlipDetl, punchMastLock, InsertPunchInOutHr,
    getPunchInOutHr, CancelPunchInOutHr, getPunchByEmid, InsertArrearSalary, getArearData, getAllEmployee, getPunchMarkingHr,
    getPunchMarkingHrFull, getTotalGrosssalaryByno, getPunchMasterSalaryAllEmployee, getAcriveDepartmentSection,
    getPunchmastAboveSelectedDate, getPunchAboveSelectedDate, submitProcessedSalary, inertMonthlyProcess,
    getProcessedDepartments, getPayrollDetails

} = require('../payrollprocess/payrollprocess.controller');

router.post("/EmpDelDept", checkToken, empDeptdata)
router.post("/EmpDelDeptSec", checkToken, empDeptSecdata)
router.post("/EmpDelName", checkToken, empNameBasedata)
router.get("/Fixed/:id", checkToken, getFixedByEmid)
router.get("/earnings/:id", checkToken, getEarningByEmid)
router.get("/deduction/:id", checkToken, getDeductionByEmid)
router.post("/fineTotal", checkToken, getTotalFineByEmid)
router.get("/fixedtotal/:id", checkToken, getTotalFixedByEmid)
router.get("/earningstotal/:id", checkToken, getTotalEarningsByEmid)
router.get("/deductiontotal/:id", checkToken, getTotalDeductionByEmid)
router.post("/totallop", checkToken, getLopByEmid)
router.get("/grosssalarybyid/:id", checkToken, getTotalGrosssalaryById)
router.get("/pfstatus/:id", checkToken, GetPfStatus)
router.get("/PfcalAmt/:id", checkToken, getPFcalcalculatingamt)
router.get("/esistatus/:id", checkToken, GetEsiStatus)
router.get("/EsicalAmt/:id", checkToken, getESIcalculatingamt)

//attendance 
router.post("/create/manual", checkToken, createAttendanceManual)
router.patch("/dutyPlanLock", checkToken, DutyPlanLock);
router.patch("/punchMastLock", checkToken, punchMastLock);

router.post("/getPayslip/data", checkToken, getPaySlipTableData)
router.get("/empFixedDetl/:id", checkToken, getEmpEarningData)

router.post("/empEarning", checkToken, getEmpEarningData)
router.post("/empFixedDetl", checkToken, getEmpFixedWageData)
router.post("/empDeduction", checkToken, getEmpDeductionData)
router.post("/allData", checkToken, getAllEarnData)
router.patch("/dutyPlanUnLock", checkToken, dutyPlanUnLock);//Hr Punch In/Out cancel
//payslip calculation
router.post("/create/payslip", checkToken, createPayrollpayslip)
router.post("/create/detail", checkToken, createPayrollpayslipDetl)
router.post("/check/payslip", checkToken, checkPayslipDataExist)
router.post("/check/dateexist", checkToken, checkAttendanceProcess)
router.post("/duty/data", checkToken, getPunchdata)
router.post("/data/all", checkToken, getattendancemark);
//attendance updation automatic
router.post("/getEmpNoDeptWise", checkToken, getEmpNoDeptWise)
router.post("/getPunchmastData", checkToken, getPunchmastData)
//payslip pdf
router.post("/getPaySlipData", checkToken, getPaySlipData)
router.post("/getIndvidualPayslipDetl", checkToken, getIndvidualPayslipDetl)

//payslip table views
router.post("/all", checkToken, deptWisePaySlipData)
router.post("/all/detail", checkToken, empWisePaySlipDetl)

//Insert Punch In/Out marking Hr to table
router.post("/Insert/PunchInOutHr", checkToken, InsertPunchInOutHr);
router.post("/getPunchInOutHr", checkToken, getPunchInOutHr)
router.post("/CancelPunchInOutHr", checkToken, CancelPunchInOutHr)

router.post("/punchbiId", checkToken, getPunchByEmid)

router.post("/insert/arear", checkToken, InsertArrearSalary)
router.post("/get/arear", checkToken, getArearData)
router.post("/getAllEmployee", checkToken, getAllEmployee)

router.post("/getPunchMarkingHrInfo", checkToken, getPunchMarkingHr)
router.post("/getPunchMarkingHrFull", checkToken, getPunchMarkingHrFull)

router.get("/getTotalGrosssalaryByno/:id", checkToken, getTotalGrosssalaryByno)
router.post("/getPunchMasterSalaryAllEmployee", checkToken, getPunchMasterSalaryAllEmployee)
router.get("/getAcriveDepartmentSection", checkToken, getAcriveDepartmentSection)

router.post("/getPunchmastAboveSelectedDate", checkToken, getPunchmastAboveSelectedDate)//contract renwal new id updation
router.post("/getPunchAboveSelectedDate", checkToken, getPunchAboveSelectedDate)

router.post("/create/processedSalary", checkToken, submitProcessedSalary)
router.post("/insert/monthlyprocess", checkToken, inertMonthlyProcess)
router.post("/getmonthdeptlist", checkToken, getProcessedDepartments)
router.post("/processed/empdata", checkToken, getPayrollDetails)



module.exports = router; 
