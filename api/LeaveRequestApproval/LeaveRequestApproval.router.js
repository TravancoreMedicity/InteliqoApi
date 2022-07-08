const router = require("express").Router();
const { checkToken } = require('../../auth/token_validation');
const { getleaverequestdep, nopunchreq, halfrequst, getcompenoff,
    getlevereqmast, getlevereqdetl, gethalfdaydetl, getnopunchreq,
    compensatoryoffdata, inchargeapprv, inchargeapprvhalfday, inchargeapprvNopunch,
    inchargeapprvCoff, HodApprvlLeave, HodApprvlHalfday, HodApprvlNopunch, HodApprvlCoff,
    CEOApprvLeave, CEOHalfDay, CEONopunch, CEOCoff,
    HRLeaveApprv, HRhalfDay, HRNopunch, HRCoff,
    updateLeavePunchMast, updateHalfdayPunchMast, updateNoPunchPunchMast, InsertCoffLeaveCalculated,
    updateNoPunchOUTPunchMast, leaveReqCancel, HalfdayCancel, NopunchCancel, CoffCancel,
    getCeoPending, getHRpending, CeoHalfdayPending, HRHalfdayPending, CeoNopunchReq, HrNopunchReq,
    CeoCoffReq, HrCoffReq,
    CoffCancelUser, NopunchCancelUser, HalfdayCancelUser, leaveReqCancelUser } = require('../LeaveRequestApproval/LeaveRequestApproval.controller');

router.post("/getleaverequestdep", checkToken, getleaverequestdep)
router.post("/nopunchreq", checkToken, nopunchreq)
router.post("/halfrequst", checkToken, halfrequst)
router.post("/getcompenoff", checkToken, getcompenoff)
router.patch("/inchargeapprv", checkToken, inchargeapprv)
router.get("/:id", checkToken, getlevereqmast)
router.get("/getlevereqdetl/:id", checkToken, getlevereqdetl)
router.get("/half/gethalfdaydetl/:id", checkToken, gethalfdaydetl)
router.get("/leave/nopunch/getnopunchreq/:id", checkToken, getnopunchreq)
router.get("/leave/com/compensatory/compensatoryoffdata/:id", checkToken, compensatoryoffdata)
router.patch("/inchargeapprvhalf", checkToken, inchargeapprvhalfday)
router.patch("/inchargeapprvnopunch", checkToken, inchargeapprvNopunch)
router.patch("/inchargeapprvcoff", checkToken, inchargeapprvCoff)
router.patch("/hodapprvlLeave", checkToken, HodApprvlLeave)
router.patch("/hodapprvlhalfday", checkToken, HodApprvlHalfday)
router.patch("/hodapprvlnopunch", checkToken, HodApprvlNopunch)
router.patch("/HodApprvlcoff", checkToken, HodApprvlCoff)
router.patch("/CeoApprvLeave", checkToken, CEOApprvLeave)
router.patch("/Ceohalfday", checkToken, CEOHalfDay)
router.patch("/Ceonopunch", checkToken, CEONopunch)
router.patch("/Ceocoff", checkToken, CEOCoff)
router.patch("/hrLeaveapprv", checkToken, HRLeaveApprv)
router.patch("/Hrhalfday", checkToken, HRhalfDay)
router.patch("/HrNopunch", checkToken, HRNopunch)
router.patch("/HrCoff", checkToken, HRCoff)
router.patch("/updatehrPuch", checkToken, updateLeavePunchMast)
router.patch("/updatehrPuchhalfday", checkToken, updateHalfdayPunchMast)
router.patch("/updatehrPuchnopunch", checkToken, updateNoPunchPunchMast)
router.post("/insertcoffleaveCalc", checkToken, InsertCoffLeaveCalculated)
router.patch("/updatehrPuchnopunchOUt", checkToken, updateNoPunchOUTPunchMast)
router.patch("/lveReqCancel", checkToken, leaveReqCancel)
router.patch("/halfdaycancelReq", checkToken, HalfdayCancel)
router.patch("/nopunchCancel", checkToken, NopunchCancel)
router.patch("/coffCancel", checkToken, CoffCancel)
router.get("/", checkToken, getCeoPending)
router.get("/hrPending/leave", checkToken, getHRpending)
router.get("/ceopending/halfday", checkToken, CeoHalfdayPending)
router.get("/HrHalfdayreq/halfDay", checkToken, HRHalfdayPending)
router.get("/Ceonopunch/nopunch", checkToken, CeoNopunchReq)
router.get("/HrNopunch/Nopunch", checkToken, HrNopunchReq)
router.get("/ceoCoff/Coff", checkToken, CeoCoffReq)
router.get("/HrCoff/coff", checkToken, HrCoffReq)
router.patch("/lveReqCancelUser", checkToken, leaveReqCancelUser)
router.patch("/halfdaycancelReqUser", checkToken, HalfdayCancelUser)
router.patch("/nopunchCanceluser", checkToken, NopunchCancelUser)
router.patch("/coffCanceluser", checkToken, CoffCancelUser)
module.exports = router;