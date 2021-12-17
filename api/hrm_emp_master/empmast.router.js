const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    createempmast,
    updateempmast,
    inactiveempmast,
    getempmast,
    getempmastByID,
    getSelectEmpmast,
    getDepartAndSectionEmpDetl,
    createCompanyInfo
} = require('../hrm_emp_master/empmast.controller');

router.post("/", checkToken, createempmast)
router.patch("/", checkToken, updateempmast)
router.delete("/", checkToken, inactiveempmast)
router.get("/", checkToken, getempmast)
router.get("/select", checkToken, getSelectEmpmast)
router.get("/:id", checkToken, getempmastByID)
router.post("/getEmpDet", checkToken, getDepartAndSectionEmpDetl)
router.post("/company", checkToken, createCompanyInfo)

module.exports = router;