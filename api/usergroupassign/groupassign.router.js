const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { insertGroupAssign, getGroupAssignById, updateGroupAssign, deleteGroupAssign, getGroupAssign } = require('../usergroupassign/groupassign.controller');

router.post("/", checkToken, insertGroupAssign);
router.patch("/", checkToken, updateGroupAssign);
router.delete("/", checkToken, deleteGroupAssign);
router.get("/", checkToken, getGroupAssign);
router.get("/:id", checkToken, getGroupAssignById);

module.exports = router;