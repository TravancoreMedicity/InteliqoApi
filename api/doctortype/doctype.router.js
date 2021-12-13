const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createDocType, updateDocType, inactiveDocType, getDocType, getDocTypeByID, getSelectDocType } = require('../doctortype/doctype.controller');

router.post("/", checkToken, createDocType);
router.patch("/", checkToken, updateDocType);
router.delete("/", checkToken, inactiveDocType);
router.get("/", checkToken, getDocType);
router.get("/select", checkToken, getSelectDocType);
router.get("/:id", checkToken, getDocTypeByID);

module.exports = router;