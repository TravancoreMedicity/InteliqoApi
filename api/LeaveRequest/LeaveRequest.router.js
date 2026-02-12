const router = require("express").Router();
const {
    checkToken
} = require('../../auth/token_validation');
const {
    createmastleave,
    createdetlleave,
    gethafdayshift,
    getfirsthalf,
    getsecondhalf,
    inserthalfdayreque,
    insertnopunchrequest,
    insertcompensatyoff,
    getLeaveCancelEmpdetl,
    modifiedLeaveRequest,
    getLeaveExcistOrNot,
    getHolidayStatus,
    creditCoff,
    doctorLeaveRequest,
    checkLWPInaMonth
} = require('../LeaveRequest/LeaveRequest.controller');

router.post("/", checkToken, createmastleave)
router.post("/inserthalfdayreque", checkToken, inserthalfdayreque)
router.post("/createdetlleave", checkToken, createdetlleave)
router.post("/insertnopunchrequest", checkToken, insertnopunchrequest)
router.post("/gethafdayshift", checkToken, gethafdayshift)
router.post("/insertcompensatyoff", checkToken, insertcompensatyoff)
router.get("/", checkToken, getfirsthalf)
router.get("/getsecondhalf", checkToken, getsecondhalf)
router.get("/leavecancel/:id", checkToken, getLeaveCancelEmpdetl)
router.post('/getHoliday', checkToken, getHolidayStatus)
router.post("/getLeaveExcistOrNot", checkToken, getLeaveExcistOrNot)
router.post("/modifiedLeaveRequest", checkToken, modifiedLeaveRequest)
router.post("/creditCoff", checkToken, creditCoff)
router.post("/insert/doctorleave", checkToken, doctorLeaveRequest)
router.post("/getLWPLeave/Inamonth", checkToken, checkLWPInaMonth)


module.exports = router;