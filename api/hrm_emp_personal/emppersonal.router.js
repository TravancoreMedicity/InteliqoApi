const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEmpPers, updateEmpPers, getEmpPersonalByID, getEmpPersonalBySlno } = require('../hrm_emp_personal/emppersonal.controller');

router.post("/", checkToken, createEmpPers);
router.patch("/", checkToken, updateEmpPers);
router.get("/select/:id", checkToken, getEmpPersonalBySlno);
router.get("/:id", checkToken, getEmpPersonalByID);

module.exports = router;