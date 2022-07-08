const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getdeptSec } = require('../coffinsert/coffinsert.controller');

// router.post("/", checkToken, createDocType);
// router.patch("/", checkToken, updateDocType);
// router.delete("/", checkToken, inactiveDocType);
// router.get("/", checkToken, getDocType);
// router.get("/select", checkToken, getSelectDocType);
router.get("/:id", checkToken, getdeptSec);

module.exports = router;