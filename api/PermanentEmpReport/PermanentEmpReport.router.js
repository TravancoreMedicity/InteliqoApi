const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const { getPermanentEmpBranch,
    getpermanentEmpBranchDept,
    getpermanentEmpDetails } = require("../PermanentEmpReport/PermanentEmpReport.controller")

/** Branch wise permanent employee list */
router.post('/branchwisepermanent', getPermanentEmpBranch)
/** Branch, Department wise permanent employee */
router.post('/branchdeptwisepermanent', getpermanentEmpBranchDept)
/** Branch, department, dept section wise permanent employee list */
router.post('/permanentdetails', getpermanentEmpDetails)
module.exports = router;


