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
    updateEmpRegister,
    getDataByEmpno,
    getDataByEmpID,
    checkidvaluedate,
    createContractDetl,
    UpdateContractDetlStatus,
    UpdateContractDetl,
    ActiveEmploye,
    insertInactiveEmp,
    getEmpList,
    insertActivateEmp,
    createCompany
} = require('../hrm_emp_master/empmast.controller');

router.post("/", checkToken, createempmast)
router.patch("/", checkToken, updateempmast)
router.delete("/", checkToken, inactiveempmast)

router.post("/empmaster/getdeptByBranch", checkToken, getEmpBybranch)
router.post("/empmaster/getdeptByDept", checkToken, getEmpByDeptartment)
router.post("/getEmpDet", checkToken, getDepartAndSectionEmpDetl)

router.get("/", checkToken, getempmast)
router.get("/select", checkToken, getSelectEmpmast)
router.get("/:id", checkToken, getempmastByID)
router.post("/getempName", checkToken, getDepartmentSectEmployye)

router.post("/getEmpDetInactive", checkToken, getInactiveEmpByDeptAndSection)
router.post("/company", checkToken, createCompanyInfo)//category changes in company information insert to log ttable and update emp_master table
router.patch("/updatecategory", checkToken, updatecategory)//Category change in company information update it in emp master
router.get("/getEmpTypeDesg/:id", checkToken, getCategoryType) //get employee Type and desgnetion type get according to category
router.patch("/empmaster/deptsecChange", checkToken, updateDeptSec)// update department section changes
router.patch("/empmaster/Inactiveemp", checkToken, InActiveEmpHR)
router.post("/empmast/serialnum", checkToken, updateserialnum)


router.patch("/empregister/Edit", checkToken, updateEmpRegister)
router.get("/databyempno/getemid/:id", checkToken, getDataByEmpno)
router.get("/databyempid/:id", checkToken, getDataByEmpID)
router.post("/checkEmno/contracterenew", checkToken, checkidvaluedate)


router.post("/createContract", checkToken, createContractDetl)//contract detl entry if contract_status=1
router.patch('/contractdetl/inactive', checkToken, UpdateContractDetlStatus)
router.patch('/update/contractdetl', checkToken, UpdateContractDetl)

router.patch('/empmsater/active', checkToken, ActiveEmploye)
router.post("/insert/inactive", checkToken, insertInactiveEmp)
router.post("/emplist/show", checkToken, getEmpList)
router.post("/insert/active", checkToken, insertActivateEmp)
router.post("/company/dept", checkToken, createCompany)

module.exports = router;