const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEmpType, updateEmpType, deleteEmpType, getEmpTypeData, getEmpTypeById } = require('../employeetype/empType.controller');

router.post("/", checkToken, createEmpType);
router.patch("/", checkToken, updateEmpType);
router.delete("/", checkToken, deleteEmpType);
router.get("/", checkToken, getEmpTypeData);
router.get("/:id", checkToken, getEmpTypeById);

module.exports = router;