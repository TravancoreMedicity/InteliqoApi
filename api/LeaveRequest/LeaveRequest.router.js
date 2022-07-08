const router = require("express").Router();
const { checkToken } = require('../../auth/token_validation');
const { createmastleave, createdetlleave, gethafdayshift,
    getfirsthalf, getsecondhalf, inserthalfdayreque, insertnopunchrequest, insertcompensatyoff,
    getLeaveCancelEmpdetl } = require('../LeaveRequest/LeaveRequest.controller');

router.post("/", checkToken, createmastleave)
router.post("/inserthalfdayreque", checkToken, inserthalfdayreque)
router.post("/createdetlleave", checkToken, createdetlleave)
router.post("/insertnopunchrequest", checkToken, insertnopunchrequest)
router.post("/gethafdayshift", checkToken, gethafdayshift)
router.post("/insertcompensatyoff", checkToken, insertcompensatyoff)
router.get("/", checkToken, getfirsthalf)
router.get("/getsecondhalf", checkToken, getsecondhalf)
router.get("/leavecancel/:id", checkToken, getLeaveCancelEmpdetl)
module.exports = router;