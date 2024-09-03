const router = require("express").Router();
const { checkToken } = require('../../auth/token_validation');
const { getDutyPlan, getEmpdetl, insertDutyplan, updateDutyPlan,
    CheckInsertVal, updateDefaultShift, updateWoffShift, updateholiday,
    getPlanDetl, updateMultiShift, checkDutyPlanExcist, getdeptEmpdetl, checkDutyPlanExcistNew,
    getDutyPlanAboveselectedDate, getEmployeeDutyplan, dutyplanExitorNot } = require('../dutyplan/dutyplan.controller');

router.post("/", checkToken, getDutyPlan)
router.post("/create", checkToken, getEmpdetl)
router.post("/insert", checkToken, insertDutyplan)
router.post("/planDetl", checkToken, getPlanDetl)
router.patch("/", checkToken, updateDutyPlan)
router.post("/check", checkToken, CheckInsertVal)
router.patch("/shiftupdate", checkToken, updateDefaultShift)
router.patch("/woffupdate", checkToken, updateWoffShift)
router.patch("/holiday", checkToken, updateholiday)
router.patch("/multiShift", checkToken, updateMultiShift)
router.post("/checkDutyExcist", checkToken, checkDutyPlanExcist)
router.post("/empdetl", checkToken, getdeptEmpdetl)
router.post("/checkDutyPlanExcistNew", checkToken, checkDutyPlanExcistNew)

router.post("/getplan", checkToken, getDutyPlanAboveselectedDate)
router.post("/employeeplan", checkToken, getEmployeeDutyplan)
router.post("/existornot", checkToken, dutyplanExitorNot)

module.exports = router;