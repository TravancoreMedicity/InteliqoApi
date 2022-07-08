const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { insertcarry, getCarrysettingById } = require('../leavecarryforward/leavecarryforward.controller');

router.post("/", checkToken, insertcarry);
router.get("/:id", checkToken, getCarrysettingById);



module.exports = router;