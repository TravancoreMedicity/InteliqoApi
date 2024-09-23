const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create, createGenralRq, createOndutyRequest, createEnableMispunchRqst, getOneHourReqst,
    getOndutyRequest, getenableMisspunchRequest, inchargeEnable, inchargeOneHour, inchargeOnDuty,
    hodEnable, hodOnDuty, hodOneHour, ceoEnable, ceoonduty, ceoOnehour, hrEnable, hrOnduty,
    hrOnehour, getGeneralReqstAll, addHrComment, checkMispunchRequest, hrEnableComment,
    hrOndutyComment, checkAttendanceProcess, generalHRapproval, cancelEnable, enableOnduty,
    cancelOnehour, cancelgeneral, onDutyReport, HrApprovedOneHourData, HrApprovedOnDutyData,
    cancelApprovedOneHour, cancelApprovedOnDuty, getEmpwiseOnduty, getEmpwiseOneHour,
    getSectWiseOneHour, getSectWiseOnDuty, OneHourForApprovalHR, OndutyForApprovalHR
} = require("../CommonRequest/CommonReqst.controller")


router.post("/", checkToken, create);
router.post("/craete/general", checkToken, createGenralRq)
router.post("/onduty/create", checkToken, createOndutyRequest)
router.post("/enablemispunch/create", checkToken, createEnableMispunchRqst)

//getting data from each table
router.get("/all/onehour", checkToken, getOneHourReqst)
router.get("/all/onDuty", checkToken, getOndutyRequest)
router.get("/all/enableMiss", checkToken, getenableMisspunchRequest)
router.get("/all/general", checkToken, getGeneralReqstAll)

//incharge approvals
router.patch("/incharge/enable", checkToken, inchargeEnable)
router.patch("/incharge/onehour", checkToken, inchargeOneHour)
router.patch("/incharge/onduty", checkToken, inchargeOnDuty)

//hod approvals
router.patch("/hod/enable", checkToken, hodEnable)
router.patch("/hod/onduty", checkToken, hodOnDuty)
router.patch("/hod/onehour", checkToken, hodOneHour)

//ceo approvals
router.patch("/ceo/enable", checkToken, ceoEnable)
router.patch("/ceo/onduty", checkToken, ceoonduty)
router.patch("/ceo/ceoOnehour", checkToken, ceoOnehour)

//hr approvals
router.patch("/hr/enable", checkToken, hrEnable)
router.patch("/hr/onduty", checkToken, hrOnduty)
router.patch("/hr/oneHour", checkToken, hrOnehour)
router.patch("/hr/general", checkToken, generalHRapproval)
router.patch("/hr/comment", checkToken, addHrComment)
router.patch("/hr/enable/comment", checkToken, hrEnableComment)
router.patch("/hr/onduty/comment", checkToken, hrOndutyComment)


router.post("/check/misspunchreq", checkToken, checkMispunchRequest)
router.post("/check/attendance", checkToken, checkAttendanceProcess)

router.patch("/cancel/enable", checkToken, cancelEnable)
router.patch("/cancel/onduty", checkToken, enableOnduty)
router.patch("/cancel/onhour", checkToken, cancelOnehour)
router.patch("/cancel/general", checkToken, cancelgeneral)

router.post("/onduty/list", checkToken, onDutyReport)

router.get("/hrApproved/onehour", checkToken, HrApprovedOneHourData)
router.get("/hrApproved/Onduty", checkToken, HrApprovedOnDutyData)

router.post("/cancel/approvedOneHour", checkToken, cancelApprovedOneHour)
router.post("/cancel/approvedOnDuty", checkToken, cancelApprovedOnDuty)

router.post("/onduty/empwise", checkToken, getEmpwiseOnduty)
router.post("/onhour/empwise", checkToken, getEmpwiseOneHour)

router.post("/onehour/sectionWise", checkToken, getSectWiseOneHour)
router.post("/onduty/sectioWise", checkToken, getSectWiseOnDuty)

router.get("/approval/onehour", checkToken, OneHourForApprovalHR)
router.get("/approval/onduty", checkToken, OndutyForApprovalHR)

module.exports = router;