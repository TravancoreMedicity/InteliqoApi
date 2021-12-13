const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEmpStatus, updateEmpStatus, deleteEmpStatus, getEmpStatusData, getEmpStatusDataById } = require('../employeestatus/empstatus.controller');

router.post("/", checkToken, createEmpStatus);
router.patch("/", checkToken, updateEmpStatus);
router.delete("/", checkToken, deleteEmpStatus);
router.get("/", checkToken, getEmpStatusData);
router.get("/:id", checkToken, getEmpStatusDataById);

module.exports = router;