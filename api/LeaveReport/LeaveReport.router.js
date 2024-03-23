const router = require("express").Router();
const { checkToken } = require('../../auth/token_validation');
const { getleavereq, getHalfday, getNopunchReq, getCoffReq, getOneHour, getOnduty
} = require('../LeaveReport/LeaveReport.controller');

router.get("/leaverequest", checkToken, getleavereq)
router.get("/halfday", checkToken, getHalfday)
router.get("/nopunch", checkToken, getNopunchReq)
router.get("/Coff", checkToken, getCoffReq)
router.get("/OneHour", checkToken, getOneHour)
router.get("/OnDuty", checkToken, getOnduty)


module.exports = router;