const router = require("express").Router()
const { checkToken } = require("../../auth/token_validation")
const { createGroupRights, updateGroupMenuRits, getModuleMenuViewRights } = require("../grouprights/groupright.controller")

router.post("/", checkToken, createGroupRights)
router.patch("/", checkToken, updateGroupMenuRits)
router.get("/", checkToken, getModuleMenuViewRights)

module.exports = router