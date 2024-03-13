const router = require("express").Router();
const { checkToken } = require('../../auth/token_validation');
const { getleavereq, getHalfday, getNopunchReq, getCoffReq
} = require('../LeaveReport/LeaveReport.controller');

router.get("/leaverequest", checkToken, getleavereq)
router.get("/halfday", checkToken, getHalfday)
router.get("/nopunch", checkToken, getNopunchReq)
router.get("/Coff", checkToken, getCoffReq)

module.exports = router;