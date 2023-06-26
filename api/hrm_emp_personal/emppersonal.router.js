const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEmpPers, updateEmpPers, getEmpPersonalByID, getEmpPersonalBySlno,
    createFamilyDetails, getDetailsbyId } = require('../hrm_emp_personal/emppersonal.controller');

router.post("/", checkToken, createEmpPers);
router.patch("/", checkToken, updateEmpPers);
router.get("/select/:id", checkToken, getEmpPersonalBySlno);
router.get("/:id", checkToken, getEmpPersonalByID);

router.post("/family", checkToken, createFamilyDetails)
router.get("/details/:id", checkToken, getDetailsbyId)

module.exports = router;