const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createModuleUserRight, updateModuleUserRight, getUserModuleRightsByID, getUserModuleRights } = require('../moduleUserRights/moduleUserRights.controller');

router.post("/", checkToken, createModuleUserRight);
router.patch("/", checkToken, updateModuleUserRight);
router.get("/", checkToken, getUserModuleRights);
router.get("/:id", checkToken, getUserModuleRightsByID);

module.exports = router;