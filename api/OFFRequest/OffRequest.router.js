const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { create, getEmpwiseDoff, cancelDoff } = require('./OffRequest.controller')


router.post("/create", checkToken, create)
router.post("/getDoff", checkToken, getEmpwiseDoff)
router.post("/delete", checkToken, cancelDoff)


module.exports = router;