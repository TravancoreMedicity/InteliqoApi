const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createmodulegruop, updatemodulegroup, getSelectgroupmast, getModuleGroupByID,
    createMenuName, geMenuName, updateMenuname, createModuleName, updateModulename } = require('../module_group_mast/moduleGroup.controller');

router.post("/", checkToken, createmodulegruop);
router.patch("/", checkToken, updatemodulegroup);
router.get("/select", checkToken, getSelectgroupmast);
router.get("/:id", checkToken, getModuleGroupByID);


router.post("/create/menu", checkToken, createMenuName)
router.get("/select/menulist", checkToken, geMenuName)
router.patch("/update/name", checkToken, updateMenuname)

router.post("/create/module", checkToken, createModuleName)
router.patch("/update/module", checkToken, updateModulename)

module.exports = router;