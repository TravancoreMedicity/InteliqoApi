const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create, update, getSelect, getdepartmentshiftMasterByID,
    getDepartmentShiftbyshiftid, checkshiftforDept, getShiftTiming,
    checkshiftforSection, getSectionShiftbyshiftid } = require('../Departmentshiftmaster/Departmentshiftmaster.controller');

router.post("/", checkToken, create);
router.patch("/", checkToken, update);
router.get("/select", checkToken, getSelect);
router.get("/:id", checkToken, getdepartmentshiftMasterByID);
router.post("/shift", checkToken, getDepartmentShiftbyshiftid);
router.post("/checkshift", checkToken, checkshiftforDept);
router.post("/getShiftTiming", checkToken, getShiftTiming);
router.post("/checkSection", checkToken, checkshiftforSection)
router.post("/SectionShift", checkToken, getSectionShiftbyshiftid)


module.exports = router;