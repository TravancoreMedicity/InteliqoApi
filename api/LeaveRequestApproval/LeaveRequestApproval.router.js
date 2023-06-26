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
    CoffCancelUser, NopunchCancelUser, HalfdayCancelUser, leaveReqCancelUser,
    AllList, AllListHOD, AllListCeo, AllListHr,
    updateCasualLeaveDetlTable, updateNationalHolidayDetlTable, updateEarnLeaveDetlTable, updateCoffDetlTable,
    updatePunchMasterEsi, updatePunchMasterlwf, updatePunchMasterLeave, leaveReqRejectHr, HalfDayReqRejectHr,
    NoPunchReqRejectHr, CoffReqRejectHr, CoffReqCancelHr, NoPunchReqCancelHr, HalfDayReqCancelHr,
    lveReqCanclHr,
    CancelHolidayLeave, CancelCasualyLeave, CancelEarnLeave, CancelCoffLeave, CancelCommonLeave,
    CancelpunchMastEsiLeave,
    CancelpunchMastLwfLeave, CancelpunchMastLeave
} = require('../LeaveRequestApproval/LeaveRequestApproval.controller');

router.post("/getleaverequestdep", checkToken, getleaverequestdep)
router.post("/nopunchreq", checkToken, nopunchreq)
router.post("/halfrequst", checkToken, halfrequst)
router.post("/getcompenoff", checkToken, getcompenoff)


router.get("/:id", checkToken, getlevereqmast)
router.get("/getlevereqdetl/:id", checkToken, getlevereqdetl)
router.get("/half/gethalfdaydetl/:id", checkToken, gethalfdaydetl)
router.get("/leave/nopunch/getnopunchreq/:id", checkToken, getnopunchreq)
router.get("/leave/com/compensatory/compensatoryoffdata/:id", checkToken, compensatoryoffdata)

//updating halfday leave approval when incharge approved
router.patch("/inchargeapprvhalf", checkToken, inchargeapprvhalfday)
//updating no punch approval when incharge approved
router.patch("/inchargeapprvnopunch", checkToken, inchargeapprvNopunch)
//updating componsatory off approval when incharge approved
router.patch("/inchargeapprvcoff", checkToken, inchargeapprvCoff)
//updating when incharge approval is done
router.patch("/inchargeapprv", checkToken, inchargeapprv)

//hod approve
router.patch("/hodapprvlLeave", checkToken, HodApprvlLeave)
router.patch("/hodapprvlhalfday", checkToken, HodApprvlHalfday)
router.patch("/hodapprvlnopunch", checkToken, HodApprvlNopunch)
router.patch("/HodApprvlcoff", checkToken, HodApprvlCoff)
//ceo approve
router.patch("/CeoApprvLeave", checkToken, CEOApprvLeave)
router.patch("/Ceohalfday", checkToken, CEOHalfDay)
router.patch("/Ceonopunch", checkToken, CEONopunch)
router.patch("/Ceocoff", checkToken, CEOCoff)
//hr approve
router.patch("/hrLeaveapprv", checkToken, HRLeaveApprv)
router.patch("/Hrhalfday", checkToken, HRhalfDay)
router.patch("/HrNopunch", checkToken, HRNopunch)
router.patch("/HrCoff", checkToken, HRCoff)

router.patch("/updatehrPuch", checkToken, updateLeavePunchMast)
router.patch("/updatehrPuchhalfday", checkToken, updateHalfdayPunchMast)
router.patch("/updatehrPuchnopunch", checkToken, updateNoPunchPunchMast)
router.post("/insertcoffleaveCalc", checkToken, InsertCoffLeaveCalculated)
router.patch("/updatehrPuchnopunchOUt", checkToken, updateNoPunchOUTPunchMast)

//employee cancel
router.patch("/lveReqCancel", checkToken, leaveReqCancel)
router.patch("/halfdaycancelReq", checkToken, HalfdayCancel)
router.patch("/nopunchCancel", checkToken, NopunchCancel)
router.patch("/coffCancel", checkToken, CoffCancel)

//ceo pending leave request
router.get("/", checkToken, getCeoPending)
router.get("/ceopending/halfday", checkToken, CeoHalfdayPending)
router.get("/Ceonopunch/nopunch", checkToken, CeoNopunchReq)
router.get("/ceoCoff/Coff", checkToken, CeoCoffReq)

router.get("/hrPending/leave", checkToken, getHRpending)
router.get("/HrHalfdayreq/halfDay", checkToken, HRHalfdayPending)
router.get("/HrNopunch/Nopunch", checkToken, HrNopunchReq)
router.get("/HrCoff/coff", checkToken, HrCoffReq)

router.patch("/lveReqCancelUser", checkToken, leaveReqCancelUser)
router.patch("/halfdaycancelReqUser", checkToken, HalfdayCancelUser)
router.patch("/nopunchCanceluser", checkToken, NopunchCancelUser)
router.patch("/coffCanceluser", checkToken, CoffCancelUser)

router.post("/Allreq/list", checkToken, AllList)
router.post("/allHod/list", checkToken, AllListHOD)
router.post("/allceo/list", checkToken, AllListCeo)
router.post("/allHr/list", checkToken, AllListHr)

router.post("/updateCasualLeaveTable", checkToken, updateCasualLeaveDetlTable)
router.post("/updateHolidayLeaveTable", checkToken, updateNationalHolidayDetlTable)
router.post("/updateEarnLeaveTable", checkToken, updateEarnLeaveDetlTable)
router.post("/updatecOffTable", checkToken, updateCoffDetlTable)

router.post("/punchMasterUpdateEsiLeave", checkToken, updatePunchMasterEsi)
router.post("/punchMasterUpdateLwfLeave", checkToken, updatePunchMasterlwf)
router.post("/punchMasterUpdateLeave", checkToken, updatePunchMasterLeave)

//hr Leave Request Reject

router.patch("/lveReqRejectHr", checkToken, leaveReqRejectHr)
router.patch("/HalfDayReqRejectHr", checkToken, HalfDayReqRejectHr)
router.patch("/NoPunchReqRejectHr", checkToken, NoPunchReqRejectHr)
router.patch("/CoffReqRejectHr", checkToken, CoffReqRejectHr)


//Leave Request Cancel
router.patch("/lveReqCanclHr", checkToken, lveReqCanclHr)
router.patch("/HalfDayReqCancelHr", checkToken, HalfDayReqCancelHr)
router.patch("/NoPunchReqCancelHr", checkToken, NoPunchReqCancelHr)
router.patch("/CoffReqCancelHr", checkToken, CoffReqCancelHr)

//Leave Cancel Leave Wise
router.post("/CancelHolidayLeave", checkToken, CancelHolidayLeave)
router.post("/CancelCasualyLeave", checkToken, CancelCasualyLeave)
router.post("/CancelEarnLeave", checkToken, CancelEarnLeave)
router.post("/CancelCoffLeave", checkToken, CancelCoffLeave)
router.post("/CancelCommonLeave", checkToken, CancelCommonLeave)
router.post("/CancelpunchMastEsiLeave", checkToken, CancelpunchMastEsiLeave)
router.post("/CancelpunchMastLwfLeave", checkToken, CancelpunchMastLwfLeave)
router.post("/CancelpunchMastLeave", checkToken, CancelpunchMastLeave)
module.exports = router;