const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    createempmast,
    updateempmast,
    inactiveempmast,
    getempmast,
    getempmastByID,
    getSelectEmpmast,
    getDepartAndSectionEmpDetl,
    createCompanyInfo, updatecategory,
    getDepartmentSectEmployye,
    getCategoryType,
    updateDeptSec,
    getInactiveEmpByDeptAndSection,
    InActiveEmpHR,
    updateserialnum,
    getEmpBybranch,
    getEmpByDeptartment,
    updateEmpRegister
} = require('../hrm_emp_master/empmast.controller');

router.post("/", checkToken, createempmast)
router.patch("/", checkToken, updateempmast)
router.delete("/", checkToken, inactiveempmast)
router.get("/", checkToken, getempmast)
router.get("/select", checkToken, getSelectEmpmast)
router.get("/:id", checkToken, getempmastByID)
router.post("/getempName", checkToken, getDepartmentSectEmployye)
router.post("/getEmpDet", checkToken, getDepartAndSectionEmpDetl)
router.post("/getEmpDetInactive", checkToken, getInactiveEmpByDeptAndSection)
router.post("/company", checkToken, createCompanyInfo)//category changes in company information insert to log ttable and update emp_master table
router.patch("/updatecategory", checkToken, updatecategory)//Category change in company information update it in emp master
router.get("/getEmpTypeDesg/:id", checkToken, getCategoryType) //get employee Type and desgnetion type get according to category
router.patch("/empmaster/deptsecChange", checkToken, updateDeptSec)// update department section changes
router.patch("/empmaster/Inactiveemp", checkToken, InActiveEmpHR)
router.post("/empmast/serialnum", checkToken, updateserialnum)
router.post("/empmaster/getdeptByBranch", checkToken, getEmpBybranch)
router.post("/empmaster/getdeptByDept", checkToken, getEmpByDeptartment)
router.patch("/empregister/Edit", checkToken, updateEmpRegister)


module.exports = router;