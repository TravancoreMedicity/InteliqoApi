const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { createSect, updateSect, deleteSect, getSect, getSectById, getSelectedDeptSection } = require('../dept_section/section.controller');

router.post("/", checkToken, createSect);
router.patch("/", checkToken, updateSect);
router.delete("/", checkToken, deleteSect);
router.get("/", checkToken, getSect);
router.get("/:id", checkToken, getSectById);
router.get("/sect/:id", checkToken, getSelectedDeptSection)

module.exports = router;