const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEmpPers, updateEmpPers, getEmpPersonalByID, getEmpPersonalBySlno,
    createFamilyDetails, getDetailsbyId, deleteRow, createLanguageKnwon,
    getLangaugesByEmpno } = require('../hrm_emp_personal/emppersonal.controller');

router.post("/", checkToken, createEmpPers);
router.patch("/", checkToken, updateEmpPers);
router.get("/select/:id", checkToken, getEmpPersonalBySlno);
router.get("/:id", checkToken, getEmpPersonalByID);

router.post("/family", checkToken, createFamilyDetails)
router.get("/details/:id", checkToken, getDetailsbyId)
router.delete("/:id", checkToken, deleteRow)
router.post("/langauge", checkToken, createLanguageKnwon)
router.get("/language/byno/:id", checkToken, getLangaugesByEmpno)

module.exports = router;