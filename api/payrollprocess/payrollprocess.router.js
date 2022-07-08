
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { empDeptdata, empDeptSecdata, empNameBasedata, getFixedByEmid, getEarningByEmid,
    getTotalFineByEmid, getTotalFixedByEmid, getTotalEarningsByEmid, getTotalDeductionByEmid,
    getDeductionByEmid, getLopByEmid, getTotalGrosssalaryById, GetPfStatus, getPFcalcalculatingamt,
    GetEsiStatus, getESIcalculatingamt } = require('../payrollprocess/payrollprocess.controller');

router.post("/EmpDelDept", checkToken, empDeptdata)
router.post("/EmpDelDeptSec", checkToken, empDeptSecdata)
router.post("/EmpDelName", checkToken, empNameBasedata)
router.get("/Fixed/:id", checkToken, getFixedByEmid)
router.get("/earnings/:id", checkToken, getEarningByEmid)
router.get("/deduction/:id", checkToken, getDeductionByEmid)
router.post("/fineTotal", checkToken, getTotalFineByEmid)
router.get("/fixedtotal/:id", checkToken, getTotalFixedByEmid)
router.get("/earningstotal/:id", checkToken, getTotalEarningsByEmid)
router.get("/deductiontotal/:id", checkToken, getTotalDeductionByEmid)
router.post("/totallop", checkToken, getLopByEmid)
router.get("/grosssalarybyid/:id", checkToken, getTotalGrosssalaryById)
router.get("/pfstatus/:id", checkToken, GetPfStatus)
router.get("/PfcalAmt/:id", checkToken, getPFcalcalculatingamt)
router.get("/esistatus/:id", checkToken, GetEsiStatus)
router.get("/EsicalAmt/:id", checkToken, getESIcalculatingamt)
module.exports = router;
