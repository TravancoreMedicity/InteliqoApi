const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getDepartmentName,
    getDistrictName,
    getSaluationName,
    getNationNameList,
    getStateList,
    getMainSideMenuList,
    getModuleNameList,
    getModuleRights,
    getBankNameDetl,
    getLeaveType,
    getEducation,
    getCourse,
    getCourseById,
    getGrades,
    getSerialnumber,
    getSerialnoempno,
    getSpecById,
    getUniversity,
    getRegistrationType,
    getWageDescription,
    getEarnings,
    getFineded,
    getpersonalData,
    GetFixedWagesSalry,
    GetEarningsSalry,
    GetDeductionSalry,
    getFineSlno,
    GetLastChangedSalary,
    getannprocess, getcasual,
    getleaveholiday,
    getleavecommon,
    getCompanyById,
    getcompanylogId,
    GetEmployeeAllowanceDetails, getprocess, getearnleave,
    getEmployeeID,
    getEmployeeDetailsByEmpID,
    getShiftdetails,
    getCasualLeave, getCasualeavearry,
    getBoardById,
    getEmpName,
    getUserDetl,
    getDeptsectIncharge,
    getCEOlevel,
    getDeptsectHOD, getleaverequwestslno, getShiftdata,
    getActiveEmployees,
    getInActiveEmployees,
    getResignedEmployess,
    getContractClosedEmp,
    getotwage,
    getCompansatoryLeave,
    getLeaveCount,
    getENameLeaveCarry,
    getEmployeeProfileInform,
    getCoffDetails, getfrndenddata,
    EmpNameCategory,
    getdutydaycheck,
    getCarryDetails,
    getEmpLeaveProcessDates,
    getEmployeeSection,
    getadvancerequestSlno,
    getContractDetl,
    getApprovalLevel,
    getDeptsecthod
} = require('../commonCode/common.controller');

router.get("/getdept", checkToken, getDepartmentName)
router.get("/getdist", checkToken, getDistrictName)
router.get("/getSalutation", checkToken, getSaluationName)
router.get("/getNation", checkToken, getNationNameList)
router.get("/getState", checkToken, getStateList)
router.get("/mainMenu/:id", checkToken, getMainSideMenuList) // For Main Side Main Menu
router.get("/getModuleName", checkToken, getModuleNameList)  // For gettting the Module Name List
router.post("/getModlRight", checkToken, getModuleRights) //get User Module right
router.get("/getBankName", checkToken, getBankNameDetl) //get Bank
router.get("/getLeaveType", checkToken, getLeaveType) //get Leave Type
router.get("/getEducation", checkToken, getEducation) // get Education
router.get("/getCourse", checkToken, getCourse) // get Course
router.get("/getCourse/:id", checkToken, getCourseById) // get Course by ID
router.get("/getGrades", checkToken, getGrades) //get Grade
router.get("/getSerialno", checkToken, getSerialnumber) //get serialno
router.get("/getleaverequwestslno", checkToken, getleaverequwestslno) //get serialno
router.get("/getSerialnoempno", checkToken, getSerialnoempno) //get serialno
router.get("/getSpec/:id", checkToken, getSpecById)//get Specialization by ID
router.get("/getUniver", checkToken, getUniversity)//get University List
router.get("/getRegistration", checkToken, getRegistrationType)//get RegistrationType
router.get("/getWageDescription", checkToken, getWageDescription) //Get Wage description (earnded_name) from hrm_earning_deduction
router.get("/getEarnings/:id", checkToken, getEarnings)   //Get details from hrm_earning_deduction depands on wage description
router.get("/getfineded", checkToken, getFineded)
router.get("/getpersonalData/:id", checkToken, getpersonalData)
router.get("/getfixedwagesSalary/:id", checkToken, GetFixedWagesSalry)//salary information of fixed Wages
router.get("/getfixedearnings/:id", checkToken, GetEarningsSalry)//salary information of Earnings
router.get("/getfixeddeduction/:id", checkToken, GetDeductionSalry)//salary information of Deduction
router.get("/getlastwage/:id", checkToken, GetLastChangedSalary)//salary information of Deduction
router.get("/getFineSlno", checkToken, getFineSlno)
router.get("/getannprocess/:id", checkToken, getannprocess)
router.get("/getcasual/:id", checkToken, getcasual)
router.get("/getearnleave/:id", checkToken, getearnleave)
router.get("/getleaveholiday/:id", checkToken, getleaveholiday)
router.get("/getleavecommon/:id", checkToken, getleavecommon)
router.get("/getcompanydetails/:id", checkToken, getCompanyById)
router.get("/getcompanylog/:id", checkToken, getcompanylogId)
router.post("/getEmpAllowance", checkToken, GetEmployeeAllowanceDetails)
router.get("/getprocess", checkToken, getprocess)
router.get("/getempid/:id", checkToken, getEmployeeID)
router.get("/getempdetails/:id", checkToken, getEmployeeDetailsByEmpID)
router.post("/getShiftdetails", checkToken, getShiftdetails)//Shift details for OT
router.get("/getcasualleave/:id", checkToken, getCasualLeave)//Shift details for OT
router.get("/getBoard/:id", checkToken, getBoardById) // get Board by education
router.get("/getEmpName/:id", checkToken, getEmpName)
router.get("/userdetl/:id", checkToken, getUserDetl)
router.get("/inchargedeptSect/:id", checkToken, getDeptsectIncharge)
router.get("/ceolevel/:id", checkToken, getCEOlevel)
router.get("/hoddeptSect/:id", checkToken, getDeptsectHOD)
router.post("/getShiftdata", checkToken, getShiftdata)
router.post("/getActiveEmp", checkToken, getActiveEmployees)
router.post("/getInActiveEmp", checkToken, getInActiveEmployees)
router.post("/getResignedEmp", checkToken, getResignedEmployess)
router.post("/getContractCloseEmp", checkToken, getContractClosedEmp)
router.get("/getotwage/:id", checkToken, getotwage)
router.get("/getcoff/:id", checkToken, getCompansatoryLeave)
router.get("/getLeavecount/:id", checkToken, getLeaveCount)//get leave count
router.get("/getENameLeaveCarry/:id", checkToken, getENameLeaveCarry)
router.get("/getEmpProfileInform/:id", checkToken, getEmployeeProfileInform) // get the empoyee profile details to the redux store
router.get("/getcoffDetl/:id", checkToken, getCoffDetails)
router.get("/getnotifydata/:id", checkToken, getfrndenddata)
router.get("/getEmpNameCategory/:id", checkToken, EmpNameCategory)
router.post("/getCasualeavearry/", checkToken, getCasualeavearry)
router.post("/getdutydaycheck", checkToken, getdutydaycheck)//punch time check in punch master for deleting
router.get("/carry/getcarryleave/:id", checkToken, getCarryDetails)
router.get("/empLeaveProcessDates/:id", checkToken, getEmpLeaveProcessDates) // Get the Employee Joinng / Contract / ategory Details
router.post("/getsecEmp", checkToken, getEmployeeSection)
router.get("/getadvanceslno", checkToken, getadvancerequestSlno) //get serialno for advance request
router.get("/getcontract/detl/:id", checkToken, getContractDetl)
router.get("/getapproval/levels/:id", checkToken, getApprovalLevel)
router.get("/hoddeptSect/:id", checkToken, getDeptsecthod)

module.exports = router;