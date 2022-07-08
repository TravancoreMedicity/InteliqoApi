const router = require("express").Router();
const { checkToken } = require('../../auth/token_validation');
const { getDutyPlan, getEmpdetl, insertDutyplan, updateDutyPlan,
    CheckInsertVal, updateDefaultShift, updateWoffShift, updateholiday } = require('../dutyplan/dutyplan.controller');

router.post("/", checkToken, getDutyPlan)
router.post("/create", checkToken, getEmpdetl)
router.post("/insert", checkToken, insertDutyplan)
router.patch("/", checkToken, updateDutyPlan)
router.post("/check", checkToken, CheckInsertVal)
router.patch("/shiftupdate", checkToken, updateDefaultShift)
router.patch("/woffupdate", checkToken, updateWoffShift)
router.patch("/holiday", checkToken, updateholiday)
module.exports = router;