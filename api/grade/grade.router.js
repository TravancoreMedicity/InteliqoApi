const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createGradeMast, updateGradeMast, deleteGradeMast, getGradeMastData, getGradeDataById } = require('../grade/grade.controller');

router.post("/", checkToken, createGradeMast);
router.patch("/", checkToken, updateGradeMast);
router.delete("/", checkToken, deleteGradeMast);
router.get("/", checkToken, getGradeMastData);
router.get("/:id", checkToken, getGradeDataById);

module.exports = router;