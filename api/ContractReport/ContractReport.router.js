const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getContractList,
    getContractReport,
    getContractReportWithDate,
    getBranchWiseContractClosed,
    getDeptWiseContractClosed,
    getContractClosedReport,
    getBranchContractRenew,
    getDeptContractRenew,
    getContractRenewReport,
    getBranchContractRunning,
    getDeptContractRunning,
    getContractCurrentRunning,
    oneYearCurrentRunningBranch,
    oneYearCurrentRunningDept,
    oneYearCurrentRunningRpt
} = require("../ContractReport/ContractReport.controller")


/** Contract details report */
router.get('/contractlist', checkToken, getContractList)
router.post('/contractreport', checkToken, getContractReport)
router.post('/contractDateRprt', checkToken, getContractReportWithDate)

/** contract closed report */
router.post('/branchcontractclosed', checkToken, getBranchWiseContractClosed)
router.post('/deptcontractclosed', checkToken, getDeptWiseContractClosed)
router.post('/contractclosed', checkToken, getContractClosedReport)
/** contract renew report */
router.post('/branchcontractrenew', checkToken, getBranchContractRenew)
router.post('/deptcontractrenew', checkToken, getDeptContractRenew)
router.post('/contractrenew', checkToken, getContractRenewReport)
/**contract current running */
router.post('/branchcontractrunning', checkToken, getBranchContractRunning)
router.post('/deptcontractrunning', checkToken, getDeptContractRunning)
router.post('/currentrunning', checkToken, getContractCurrentRunning)

/** One Year + Current Running */
router.post('/branchOneyear', checkToken, oneYearCurrentRunningBranch)
router.post('/deptOneYear', checkToken, oneYearCurrentRunningDept)
router.post('/OneYearCurrentRunning', checkToken, oneYearCurrentRunningRpt)
module.exports = router;