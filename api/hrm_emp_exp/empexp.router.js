const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createExp, updateExp, getExpByID, getSelectAllExpByID, getDataByEmpno, DeleteByIdExp } = require('../hrm_emp_exp/empexp.controller');

router.post("/", checkToken, createExp);
router.patch("/", checkToken, updateExp);
router.get("/select/:id", checkToken, getSelectAllExpByID);
router.get("/:id", checkToken, getExpByID);

router.get("/dataByEmpno/:id", checkToken, getDataByEmpno)
router.delete("/:id", checkToken, DeleteByIdExp);

module.exports = router;