const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createmodulegruop, updatemodulegroup, getSelectgroupmast, getModuleGroupByID } = require('../module_group_mast/moduleGroup.controller');

router.post("/", checkToken, createmodulegruop);
router.patch("/", checkToken, updatemodulegroup);
router.get("/select", checkToken, getSelectgroupmast);
router.get("/:id", checkToken, getModuleGroupByID);


module.exports = router;