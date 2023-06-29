const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getResignCount, getContractCloseCount, OtRequestCount, OtReqInchargeCount, OtReqHodCount,
    OtReqCEOCount, OtReqHRCount, LeaveReqInchargeCount, LeaveReqHodCount, LeaveReqCeoCount,
    LeaveReqHrCount, OtRequestCountUser, LeaveReqCountUser, ResignReqInchargeCount,
    ResignReqHodCount, ResignReqCeoCount, contractrenewalCount, trainingconformationCount,
    getLeaveRequestID, RegistrationPending, RegistrationPendingList, probationEndCount,
    annualAppraisalCount, trainingAppraisalCount, contractEndCount, getpunchCount, getActiveEmpCount,
    contractAppraisalCount, esiNotAddedList } = require('../dashboardcount/count.controller');

router.get("/", checkToken, getResignCount);
router.get("/:id", checkToken, getLeaveRequestID);
router.get("/contractcloseCount/list", checkToken, getContractCloseCount);
router.get("/OtRequestCount", checkToken, OtRequestCount);
router.get("/OtReqInchargeCount", checkToken, OtReqInchargeCount);
router.get("/OtReqHodCount", checkToken, OtReqHodCount);
router.get("/OtReqCEOCount", checkToken, OtReqCEOCount);
router.get("/OtReqHRCount", checkToken, OtReqHRCount);
router.get("/OtRequest/CountUser/:id", checkToken, OtRequestCountUser)
router.get("/LeaveReqInchargeCount", checkToken, LeaveReqInchargeCount);
router.get("/LeaveReqHodCount", checkToken, LeaveReqHodCount);
router.get("/LeaveReqCeoCount", checkToken, LeaveReqCeoCount);
router.get("/LeaveReqHrCount", checkToken, LeaveReqHrCount);
router.get("/LeaveReqCount/User/:id", checkToken, LeaveReqCountUser)
router.get("/ResignReqInchargeCount", checkToken, ResignReqInchargeCount);
router.get("/ResignReqHodCount", checkToken, ResignReqHodCount);
router.get("/ResignReqCeoCount", checkToken, ResignReqCeoCount);
router.get("/contractrenewalCount", checkToken, contractrenewalCount);
router.get("/trainingconformationCount", checkToken, trainingconformationCount);
router.get("/registration/pending", checkToken, RegistrationPending);
router.get("/registration/pending/list", checkToken, RegistrationPendingList);

router.get("/probCount/list", checkToken, probationEndCount)
router.get("/annualempcount/list", checkToken, annualAppraisalCount)
router.get("/trainingcount/list", checkToken, trainingAppraisalCount)
router.get("/contractcount/list", checkToken, contractEndCount)
router.get("/contractappraisal/list", checkToken, contractAppraisalCount)

router.get("/activecount/countlist", checkToken, getActiveEmpCount);
router.get("/punch/count", getpunchCount)
router.get("/esi/list", checkToken, esiNotAddedList)


module.exports = router;


