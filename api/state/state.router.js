const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createState, updateState, inacticeState, getStateData, getStateDataById, getSelectDrop } = require('../state/state.controller');

router.post("/", checkToken, createState);
router.patch("/", checkToken, updateState);
router.delete("/", checkToken, inacticeState);
router.get("/", checkToken, getStateData);
router.get("/select", checkToken, getSelectDrop);
router.get("/:id", checkToken, getStateDataById);


module.exports = router;