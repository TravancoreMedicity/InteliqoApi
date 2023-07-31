const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createearndeduction, updateearndeduction, getEarnDeductByID,
    inactiveEarnDeduct, getEarnDeductBySlno, GetFixedAndEarningWage,
    getDataByEmpno, createEmpsalRyContractRenew, getFixedWage,
    getEarning, getDeduction, getEmpDataByEmno, getALLData, newRecommended,
    updateEmpGrossSalary, getTotalGrosssalaryById } = require('../employeEarnDeduction/earnDeduction.controller');

router.post("/", checkToken, createearndeduction);
router.patch("/", checkToken, updateearndeduction);
router.delete("/", checkToken, inactiveEarnDeduct);
router.get("/select/:id", checkToken, getEarnDeductBySlno);
router.get("/:id", checkToken, getEarnDeductByID);
router.post("/getwage", checkToken, GetFixedAndEarningWage);
router.get("/deductionbyempno/:id", checkToken, getDataByEmpno)
router.post("/insertSalaryContract", checkToken, createEmpsalRyContractRenew)


router.post("/fixed", checkToken, getFixedWage)
router.post("/earning", checkToken, getEarning)
router.post("/deduction", checkToken, getDeduction)
router.get("/getAll/:id", checkToken, getEmpDataByEmno)
router.post("/all/data", checkToken, getALLData)

router.patch("/update/empmaster", checkToken, updateEmpGrossSalary)

//New emp Recommended salary splitness
router.get("/newRecommended/allEmp", checkToken, newRecommended);
router.get("/grosssalarybyid/:id", checkToken, getTotalGrosssalaryById)

module.exports = router;