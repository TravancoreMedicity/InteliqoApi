const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createQual, updateQual, deleteQual, getQualData, getQualDataById } = require('../qualification/qualification.controller');

router.post("/", checkToken, createQual);
router.patch("/", checkToken, updateQual);
router.delete("/", checkToken, deleteQual);
router.get("/", checkToken, getQualData);
router.get("/:id", checkToken, getQualDataById);

module.exports = router;