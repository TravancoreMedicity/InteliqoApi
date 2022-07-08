const router = require("express").Router()
const { checkToken } = require("../../auth/token_validation")
const { createGroupRights, updateGroupMenuRits, getModuleMenuViewRights, getModuleMenuList } = require("../grouprights/groupright.controller")

router.post("/", checkToken, createGroupRights)
router.patch("/", checkToken, updateGroupMenuRits)
router.get("/", checkToken, getModuleMenuViewRights)
router.get("/:id", checkToken, getModuleMenuList)

module.exports = router