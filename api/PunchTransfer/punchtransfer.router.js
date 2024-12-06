const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getpunchdata, getActiveEmployee, getEmployeePunch } = require("../PunchTransfer/punchtransfer.controller")

router.post("/punchdata", checkToken, getpunchdata)
router.get("/allemployee", checkToken, getActiveEmployee)
router.post("/employeewise", checkToken, getEmployeePunch)


module.exports = router;