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
    getcompanylogId
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
router.get("/getleaveholiday/:id", checkToken, getleaveholiday)
router.get("/getleavecommon/:id", checkToken, getleavecommon)
router.get("/getcompanydetails/:id", checkToken, getCompanyById)
router.get("/getcompanylog/:id", checkToken, getcompanylogId)


module.exports = router;