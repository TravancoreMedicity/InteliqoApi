const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getBranchActiveEmployees,
    getDeptActiveEmployees,
    getActiveEmployees,
    getBranchInActiveEmployees,
    getActiveEmployeesDate,
    getDeptInActiveEmployees,
    getInActiveEmployees,
    getBranchResignedEmployees,
    getDeptResignedEmployees,
    getResignedEmployees,
    getBranchActiveEmpDate,
    getDeptActiveEmpDate
} = require('../ActiveEmpReport/ActiveEmpReport.controller')

/** Active employee List*/

router.post('/branchactiveemp', checkToken, getBranchActiveEmployees)
router.post('/deptactiveemp', checkToken, getDeptActiveEmployees)
router.post('/activeemp', checkToken, getActiveEmployees)
router.post('/branchactviedate', checkToken, getBranchActiveEmpDate)
router.post('/deptactivedate', checkToken, getDeptActiveEmpDate)
router.post('/activeempdate', checkToken, getActiveEmployeesDate)


router.post('/branchInActive', checkToken, getBranchInActiveEmployees)
router.post('/deptInactive', checkToken, getDeptInActiveEmployees)
router.post('/inactive', checkToken, getInActiveEmployees)


router.post('/branchresigned', checkToken, getBranchResignedEmployees)
router.post('/deptresigned', checkToken, getDeptResignedEmployees)
router.post('/resigned', checkToken, getResignedEmployees)
module.exports = router;