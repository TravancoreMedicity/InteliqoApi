const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createInst, updateInst, deleteinst, getData, getDataById } = require('../institutionType/instType.controller');

router.post("/", checkToken, createInst);
router.patch("/", checkToken, updateInst);
router.delete("/", checkToken, deleteinst);
router.get("/", checkToken, getData);
router.get("/:id", checkToken, getDataById);

module.exports = router;