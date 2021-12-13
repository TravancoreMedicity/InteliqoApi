const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation");
const { insertuserGroup, updateUserGroup, deleteUserGroup, getUserGroups, getGroupById, getUserGroupsSelected } = require('../usergroup/usrgroup.controller');

router.post("/", checkToken, insertuserGroup);
router.patch("/", checkToken, updateUserGroup);
router.delete("/", checkToken, deleteUserGroup);
router.get("/", checkToken, getUserGroups);
router.get("/select", checkToken, getUserGroupsSelected);
router.get("/:id", checkToken, getGroupById);

module.exports = router;